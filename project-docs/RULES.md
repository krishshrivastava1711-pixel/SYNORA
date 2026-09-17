# SyncWrite — Development Rules

## 1. Build the Collaboration Engine First
A reliable collaboration flow is more important than visual extras.

## 2. Use Yjs
Use Yjs for CRDT synchronization. Do not implement a custom CRDT during the hackathon.

## 3. No Last-Write-Wins
Do not use Last-Write-Wins as conflict resolution.

## 4. Use TipTap
Do not build a rich-text editor from scratch.

## 5. Use WebSockets
Use y-websocket or an equivalent proven provider.

## 6. Offline First
Use y-indexeddb for local Yjs persistence.

## 7. Presence Is Ephemeral
Do not permanently store cursors, selections, or online status.

## 8. Database
Use PostgreSQL for metadata. Do not create one database row per keystroke.

## 9. UI
The UI must be:
- minimal
- clean
- restrained
- responsive
- production-like

Avoid:
- neon
- glassmorphism
- excessive gradients
- huge cards
- excessive rounded containers
- fake analytics
- excessive animation

## 10. Never Hide Sync State
Clearly communicate:
- synced
- syncing
- reconnecting
- offline
- error

## 11. Failure Safety
Never silently discard user changes.

## 12. Testing
Always test:
- concurrent edits
- three clients
- offline editing
- online/offline concurrent edits
- reconnection
- refresh persistence

## 13. AI Coding
AI tools may generate code, but every generated feature must be read, run, and tested.

Workflow:
```text
Generate -> Read -> Run -> Test -> Inspect -> Keep/Fix
```

Never blindly accept generated CRDT, authentication, database-security, or WebSocket lifecycle code.

## 14. Scope
If synchronization is broken, do not add comments, history, dark mode, animations, or extra pages.

## 15. Demo
The demo must be reproducible:

```text
3 users
-> simultaneous editing
-> cursors
-> network failure
-> offline editing
-> reconnect
-> CRDT merge
-> consistent state
```

## 16. Definition of Done
- [ ] Create document
- [ ] Open by link
- [ ] Multi-user editing
- [ ] Realtime synchronization
- [ ] Live cursors
- [ ] Live selections
- [ ] Presence
- [ ] Offline editing
- [ ] Reconnection
- [ ] Automatic merge
- [ ] Persistence
- [ ] Sync status
- [ ] Reliable demo
