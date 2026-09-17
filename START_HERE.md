# SyncWrite — source code download

This archive contains the complete source of the published prototype, its Node WebSocket/PostgreSQL collaboration service, dependency lockfile, and original project requirements.

## Run the website locally (Windows, macOS, Linux)

Install Node.js 22.13 or newer. Open a terminal in the extracted SyncWrite folder:

```sh
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed in the terminal. Use the same localhost address and browser profile to test collaboration in three tabs. The app uses IndexedDB for local document recovery. You can create documents, edit rich text, open the same document in other tabs, and use Demo tools to disconnect and reconnect a client.

Build and preview the Worker application:

```sh
pnpm build
pnpm start
```

The app uses React/TypeScript and Vinext with Next.js-compatible routes, rather than a standalone Next.js deployment. The included scripts default to portable mode outside the managed build environment. You do not need the ChatGPT Sites plugin to run these package commands locally. Do not use the managed-environment install:ci script on Windows; use the pnpm install command above.

## Cross-device collaboration

Read collaboration/README.md. Apply collaboration/schema.sql to PostgreSQL, set DATABASE_URL, ALLOWED_ORIGIN and PORT, and run:

```sh
node collaboration/server.mjs
```

The server does not automatically read .env files. Set these environment variables in your terminal or use Node's --env-file option with your own private environment file. ALLOWED_ORIGIN must exactly match the frontend origin, including its port. Use HTTPS/WSS for remote deployment. In the app's Settings, enter the WebSocket endpoint on each client.

## What is and is not complete

Implemented: document workspace, rich-text editing, Yjs CRDT binding, ephemeral cursor awareness, browser-local IndexedDB persistence, same-browser tab collaboration, reconnection controls, link copying and HTML backup download.

Verified: frontend build, document creation, three browser tabs merging online/offline edits, and document recovery after refresh. The standalone PostgreSQL service has not been tested against a live database or deployed.

Not complete: account sign-up/login, server-backed document listing and membership/permissions, production cross-device hosting, full offline reload support (there is no service worker), latency/packet-loss controls, and all routes/features described in the original requirements. Opening an already-loaded editor while disconnected is supported; first loading the site without network access is not guaranteed.

The hosted site is private. Its current access policy does not automatically make document links accessible to other users. Document links on the standalone collaboration service grant edit access to anyone possessing the UUID; there is no account authorization in that service. The dashboard index remains local even when using the external server.

The .openai/hosting.json file records the original Site identity; it is not a credential. Do not use that identity to create an unrelated hosted Site. It is included to preserve the original source.

## Folder map

- app/: workspace, editor, routes, styles and local metadata storage
- components/ui/: shared interface primitives
- collaboration/: standalone WebSocket server, PostgreSQL schema and deployment notes
- project-docs/: original requirements, architecture, rules, design and phases
- package.json and pnpm-lock.yaml: dependencies and reproducible installation
- README.md: underlying runtime documentation

Dependencies and generated build output are excluded. Install dependencies using the lockfile. No database contents, browser documents, tokens or private environment files are included.
