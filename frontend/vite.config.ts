import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
server: {
  host: "127.0.0.1",
  port: 5173,
  hmr: {
    overlay: false,
  },
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8000",
      changeOrigin: false,
    },
    "/uploads": {
      target: "http://127.0.0.1:8000",
      changeOrigin: false,
    },
  },
},

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-recharts": ["recharts"],
          "vendor-stripe": ["@stripe/react-stripe-js", "@stripe/stripe-js"],
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
