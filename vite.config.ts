// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all interfaces
    port: 5173,
    allowedHosts: [
      "8nvfnw-5173.csb.app", // <-- your sandbox host (from the error)
      "csb.app",
      "codesandbox.io",
    ],
    hmr: {
      protocol: "wss",
      clientPort: 443,
      host: "8nvfnw-5173.csb.app",
    },
  },
});
