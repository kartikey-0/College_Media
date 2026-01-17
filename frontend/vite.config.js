import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [
      react(),

      // 🔹 Enable compression ONLY during build
      isBuild &&
        compression({
          algorithm: "gzip",
          ext: ".gz",
        }),

      isBuild &&
        compression({
          algorithm: "brotliCompress",
          ext: ".br",
        }),

      // 🔹 Bundle analyzer ONLY during build
      isBuild &&
        visualizer({
          open: process.env.ANALYZE === "true",
          filename: "dist/stats.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    // 🔹 Base path ONLY for production
    base: "/",

    // 🔹 DEV SERVER (explicit)
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      hmr: process.env.NODE_ENV === 'development' ? {
        protocol: "ws",
        host: "localhost",
        port: 5173,
        clientPort: 5173,
      } : undefined,
    },

    // 🔹 BUILD-ONLY settings
    build: isBuild
      ? {
          rollupOptions: {
            output: {
              manualChunks: {
                react: ["react", "react-dom", "react-router-dom"],
                ui: ["lucide-react", "@iconify/react"],
                utils: ["axios", "immer", "use-immer"],
                socket: ["socket.io-client"],
              },
            },
          },
          chunkSizeWarningLimit: 500,
          minify: "terser",
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
          sourcemap: false,
        }
      : {},

    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },
  };
});
