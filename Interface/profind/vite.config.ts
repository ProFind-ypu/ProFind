import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   server: {
      host: true,
      port: 8080, // Change this to your desired port
   },
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
         "@components": path.resolve(__dirname, "./src/components"),
      },
   },
});
