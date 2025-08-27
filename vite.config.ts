import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Sweetalert2: "sweetalert2",
      "sweetalert2/dist/sweetalert2.js": "sweetalert2",
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
