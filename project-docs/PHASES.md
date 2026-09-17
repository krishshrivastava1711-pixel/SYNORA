# SyncWrite — 8-Hour Build Plan

## 0:00–0:20 — Setup
- Next.js + TypeScript
- Tailwind
- TipTap
- Yjs
- y-websocket
- y-indexeddb
- Routes

Checkpoint: app runs.

## 0:20–1:20 — Editor
Build:
- TipTap
- toolbar
- headings
- bold/italic/underline
- lists
- undo/redo

Checkpoint: single-user editor works.

## 1:20–2:40 — CRDT Collaboration
Build:
- Y.Doc
- TipTap/Yjs binding
- WebSocket provider
- shared document ID

Test two and then three browser sessions.

Checkpoint: concurrent edits synchronize reliably.

## 2:40–3:30 — Presence
Build:
- Awareness
- names
- colors
- live cursors
- selections
- active-user avatars

Checkpoint: users can see each other.

## 3:30–4:30 — Offline Recovery
Build:
- y-indexeddb
- offline state
- reconnect
- sync status

Test:
```text
B disconnects
B edits offline
A edits online
B reconnects
Both changes remain
```

Checkpoint: offline changes survive reconnection.

## 4:30–5:30 — Full-Stack Data
Build:
- authentication/session
- document creation
- title
- metadata
- dashboard
- open document

Checkpoint: documents can be created and reopened.

## 5:30–6:15 — Sharing
Build:
- share URL
- copy link
- basic permission UI

Checkpoint: another browser can join.

## 6:15–7:00 — UI Polish
Focus on:
- typography
- spacing
- loading
- empty/error states
- responsive layout
- status indicators

Do not add major features.

## 7:00–7:30 — Demo Tools
Build:
- disconnect
- reconnect
- latency
- optional packet loss
- system state

## 7:30–8:00 — Testing
Run the complete demo repeatedly:
3 clients -> concurrent edits -> cursors -> disconnect -> offline edit -> online edit -> reconnect -> merge -> refresh.

Do not add new features in the last 30 minutes.

## Priority
### P0
CRDT, realtime, multiple clients, presence, offline, reconnect, persistence.

### P1
Dashboard, sharing, rich text, network simulator, UI polish.

### P2
Comments, history, advanced permissions, export, favorites, notifications, dark mode.
