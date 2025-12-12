# AI Rules & Tech Stack

## Tech Stack
- **Runtime:** Node.js (>=16.0.0)
- **Package Manager:** pnpm
- **Server Framework:** Fastify
- **Frontend:** Vanilla HTML, CSS, and JavaScript (No UI frameworks like React or Vue)
- **Proxy Technology:** Scramjet (@mercuryworkshop/scramjet)
- **Networking/Transport:** Wisp (@mercuryworkshop/wisp-js), Epoxy, Bare-Mux
- **Formatting/Linting:** Prettier, ESLint

## Development Rules

### Backend (Node.js/Fastify)
- The main server entry point is `src/index.js`.
- Use **Fastify** for all HTTP server logic.
- Use `@fastify/static` for serving static assets from the `public/` directory and library paths (scramjet, epoxy, bare-mux).
- **Wisp** is used for WebSocket handling (`/wisp/` route) to tunnel traffic.

### Frontend (public/)
- Keep the frontend simple using standard HTML5, CSS3, and ES6+ JavaScript.
- **Do not** introduce build tools like Webpack or Vite unless necessary; the current setup serves raw files.
- **Do not** add heavy UI libraries (React, Angular, etc.). This is a lightweight proxy demo.
- Service Workers (`sw.js`, `register-sw.js`) are critical for the proxy functionality. Ensure they are correctly registered and served.

### Proxy Configuration
- Scramjet configuration resides in `src/index.js` (server-side) and `public/index.js` (client-side).
- Wisp server options (blacklists, DNS) are configured in `src/index.js`.

### Deployment
- The application is container-ready (Dockerfile provided) but can run directly via Node.
- Ensure the `PORT` environment variable is respected.