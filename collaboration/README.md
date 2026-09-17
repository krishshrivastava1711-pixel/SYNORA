# SyncWrite collaboration service

The hosted UI currently works offline and across tabs of the same browser. Cross-device editing requires this separately deployed Node service and PostgreSQL. The Sites runtime cannot host this long-running Node WebSocket service. No remote service or PostgreSQL database has been provisioned.

Install the repository dependencies. Apply `schema.sql` to PostgreSQL. Set `DATABASE_URL`, `ALLOWED_ORIGIN` (the exact deployed frontend origin), and `PORT`, then run `node collaboration/server.mjs` behind HTTPS/WSS on one Node instance. Set the resulting WSS endpoint in the app's Settings on each client. PostgreSQL TLS must be configured according to your provider; this service does not disable certificate verification.

Document links act as edit capabilities: anyone with the unguessable UUID and site access may join. There is no user-account authentication, role-based permission system, or server document listing yet. Do not expose this demonstration server for sensitive or production documents until those controls are added. The server is single-instance; do not horizontally scale without shared room ownership.

Updates are compacted into one Yjs snapshot per room every second and on room close, using a transaction and row lock. This is a Yjs state merge, never last-write-wins for document content. Cursor awareness is never written to PostgreSQL. Clients retain IndexedDB recovery state. A green transport synchronization indicator confirms peer exchange, not a PostgreSQL durable-write acknowledgement. Persistence failures are logged and retried; operations staff must monitor them.

Metadata title is extracted from the Yjs metadata map; the dashboard's document index remains a browser-local cache in this version. Clearing browser storage removes the local index and any unsynchronized work. Download HTML backups before clearing browser data.
