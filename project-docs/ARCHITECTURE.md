# SyncWrite — Architecture

## Overview
SyncWrite is an offline-first, real-time collaborative rich-text editor. The system uses Yjs CRDT synchronization instead of Last-Write-Wins.

## Architecture

```text
Next.js / React
      |
   TipTap
      |
     Yjs
   /     \
IndexedDB  WebSocket
              |
       Collaboration Server
              |
        PostgreSQL
```

## Components

### Frontend
- Next.js + React + TypeScript
- TipTap for rich-text editing
- Yjs for shared document state
- y-indexeddb for offline persistence
- Yjs Awareness for presence

### Realtime
Use y-websocket for distributing Yjs updates between connected clients.

The server distributes updates; it must not implement Last-Write-Wins conflict resolution.

### Database
PostgreSQL stores application metadata:

```text
users
documents
document_members
```

Do not store every keystroke as a database row.

### Offline Flow

```text
Edit -> TipTap -> Yjs -> IndexedDB
                         |
                    offline
                         |
                    reconnect
                         |
                    WebSocket
                         |
                    CRDT merge
                         |
                 all clients converge
```

### Presence
Presence contains ephemeral:
- user ID
- name
- collaboration color
- cursor
- selection

Do not permanently store cursor positions.

### Connection States
- CONNECTED
- SYNCING
- RECONNECTING
- OFFLINE

### Failure Requirements
- Client disconnect: local editing continues.
- Reconnection: missing updates synchronize automatically.
- Concurrent edits: Yjs resolves and clients eventually converge.
- Refresh/restart: persisted state can be recovered.

## MVP Principle
Use proven libraries. Do not build a custom CRDT or custom synchronization protocol during the 8-hour hackathon.
