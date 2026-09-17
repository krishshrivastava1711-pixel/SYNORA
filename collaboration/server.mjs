import http from 'node:http';
import {WebSocketServer} from 'ws';
import {Pool} from 'pg';
import * as Y from 'yjs';
import {setupWSConnection,setPersistence} from '@y/websocket-server/utils';
if(!process.env.DATABASE_URL||!process.env.ALLOWED_ORIGIN)throw new Error('DATABASE_URL and ALLOWED_ORIGIN are required');
const pool=new Pool({connectionString:process.env.DATABASE_URL});
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const rooms=new Map();
async function persist(id,doc){const client=await pool.connect();try{await client.query('BEGIN');await client.query('INSERT INTO documents(id,state) VALUES($1,$2) ON CONFLICT(id) DO NOTHING',[id,Buffer.from(Y.encodeStateAsUpdate(doc))]);const {rows}=await client.query('SELECT state FROM documents WHERE id=$1 FOR UPDATE',[id]);const merged=new Y.Doc();Y.applyUpdate(merged,new Uint8Array(rows[0].state));Y.applyUpdate(merged,Y.encodeStateAsUpdate(doc));await client.query('UPDATE documents SET state=$2,title=$3,updated_at=now() WHERE id=$1',[id,Buffer.from(Y.encodeStateAsUpdate(merged)),String(merged.getMap('metadata').get('title')||'Untitled document').slice(0,500)]);merged.destroy();await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}}
setPersistence({bindState:async(id,doc)=>{let record={dirty:true,busy:false};rooms.set(id,record);doc.on('update',()=>{record.dirty=true});try{const {rows}=await pool.query('SELECT state FROM documents WHERE id=$1',[id]);if(rows[0])Y.applyUpdate(doc,new Uint8Array(rows[0].state));}catch(e){console.error('Document load failed',id,e.message);for(const ws of doc.conns.keys())ws.close(1011,'Database unavailable');return;}record.timer=setInterval(async()=>{if(!record.dirty||record.busy)return;record.busy=true;record.dirty=false;try{await persist(id,doc)}catch(e){record.dirty=true;console.error('Persistence failed',id,e.message)}finally{record.busy=false}},1000);},writeState:async(id,doc)=>{const record=rooms.get(id);if(record)clearInterval(record.timer);try{await persist(id,doc);rooms.delete(id)}catch(e){console.error('Final persistence failed',id,e.message);throw e}}});
const server=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({service:'SyncWrite collaboration',status:'running'}))});
const wss=new WebSocketServer({noServer:true,maxPayload:4*1024*1024});
server.on('upgrade',(req,socket,head)=>{const id=new URL(req.url,'http://localhost').pathname.slice(1);if(req.headers.origin!==process.env.ALLOWED_ORIGIN||!uuid.test(id)){socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');socket.destroy();return}wss.handleUpgrade(req,socket,head,ws=>setupWSConnection(ws,req,{docName:id}))});
server.listen(Number(process.env.PORT||1234),'0.0.0.0',()=>console.log('SyncWrite collaboration service ready'));
