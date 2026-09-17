# SyncWrite — Design System

## Product
**SyncWrite**

**Tagline:** Collaborate in real time. Keep working offline.

## Design Goal
Create a clean, minimal, production-quality interface. It must not look vibe-coded, AI-generated, overly futuristic, or like a generic hackathon template.

Think:
- calm
- precise
- professional
- functional
- human-designed

General references: Linear, Notion, Dropbox Paper, Craft, GitHub, Google Docs. Do not copy them.

## Visual Rules
- Neutral background
- White editor surface
- One restrained blue/indigo accent
- Subtle borders
- Very soft shadows
- Small/medium radius
- Simple icons
- Generous whitespace
- Strong typography
- No glassmorphism
- No neon
- No glowing effects
- No excessive gradients
- No giant floating cards
- No unnecessary badges
- No excessive animation

## Typography
Use Inter, Geist, or system sans-serif.

## Pages

### `/` Landing
Minimal header, restrained hero, one large realistic editor preview, three feature points, simple synchronization explanation, final CTA.

Hero:
> Write together. Without losing a thing.

### `/login` and `/signup`
Minimal centered authentication forms. Optional editor illustration on desktop.

### `/dashboard`
Workspace, not an analytics dashboard.

Use:
- small sidebar
- search
- document list
- New Document
- recent/shared filters
- collaborator avatars

Prefer compact document rows over giant cards.

### `/editor/[documentId]`
Most important screen.

Structure:
```text
Top bar
Toolbar
Document canvas
Optional collaboration sidebar
Bottom status bar
```

Top bar:
- SyncWrite
- document title
- sync state
- avatars
- Share

Document:
- large centered writing surface
- minimal decoration
- comfortable typography

Collaboration:
- thin colored cursors
- small user labels
- subtle selections
- compact avatars

Sidebar:
- People
- Activity

### `/settings`
Simple profile, appearance, notifications, collaboration, account settings.

## Status
```text
● Synced
● Synchronizing...
● Offline
```

Keep status compact.

## Network Simulator
Hide under “Demo tools”. Include Disconnect, Reconnect, latency and packet-loss controls. It is a presentation tool, not normal product UI.

## Responsive
Desktop first. Collapse sidebars and toolbars on smaller screens while keeping the editor and sync state accessible.

## UX Rule
When in doubt, remove elements. The editor is the product.
