# SyncWrite — Product Requirements

## Product Summary
SyncWrite is an offline-first, real-time collaborative document editor that lets multiple users edit the same rich-text document while maintaining consistent state through concurrent edits and temporary network failures.

## Problem
Traditional document workflows create:
- duplicate files
- manual merging
- overwritten changes
- delayed collaboration
- work interruption during connectivity failures

## Target Users
- Students working on group assignments
- Remote teams
- Researchers
- Hackathon/project teams
- NGOs and field teams with unreliable connectivity

## MVP Goals
1. Multiple users edit simultaneously.
2. CRDT-based conflict resolution.
3. Live cursors and selections.
4. Presence.
5. Offline editing.
6. Automatic reconnection and synchronization.
7. Persistent documents.
8. Shareable documents.
9. Clear connection status.

## Functional Requirements

### FR-01 Create Document
User can create a titled document.

### FR-02 Open Document
User can open a document from the dashboard or a shared link.

### FR-03 Rich Text
Support:
- bold
- italic
- underline
- headings
- bullet list
- numbered list
- undo/redo

### FR-04 Realtime Collaboration
Connected clients receive edits without refresh.

### FR-05 Conflict Resolution
Use a CRDT such as Yjs. Last-Write-Wins is not allowed as the conflict-resolution strategy.

### FR-06 Presence
Show:
- active collaborators
- cursor positions
- selections
- names/colors

### FR-07 Offline Editing
Disconnected users can continue editing.

### FR-08 Reconnection
Offline changes synchronize automatically after reconnecting.

### FR-09 Persistence
Refresh must not destroy the document.

### FR-10 Sharing
Users can share a document link.

### FR-11 Connection Status
Display Synced, Synchronizing, Offline and Reconnecting.

## Non-Functional Requirements
- Local edits should feel immediate.
- Clients should eventually converge.
- Temporary network failure must not cause document loss.
- UI should be simple enough for a first-time user.

## Success Criteria
The demo must prove:

```text
3 clients
  -> same document
  -> simultaneous edits
  -> live cursors
  -> one client offline
  -> offline editing
  -> other clients continue
  -> reconnect
  -> automatic CRDT merge
  -> consistent final state
```

## Out of Scope
- Full Google Docs parity
- Video calls
- Voice typing
- Advanced comments
- Complex enterprise permissions
- Spreadsheet features
- AI assistant
- Full revision history
