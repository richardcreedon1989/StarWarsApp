// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all interfaces
    port: 5174,
    allowedHosts: [
      // "localhost",
      // "8nvfnw-5173.csb.app",
      // "csb.app",
      // "codesandbox.io",
    ],
    hmr: {
      // protocol: "wss", //calls localhost constantly otgherwise
      // clientPort: 443,
      // host: "8nvfnw-5173.csb.app",
    },
  },
});
