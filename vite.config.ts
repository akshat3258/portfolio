import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Chunk splitting: separates heavy 3D libs from app code for better caching & faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          "vendor-react": ["react", "react-dom"],
          // Three.js core
          "vendor-three": ["three"],
          // R3F ecosystem (heavy — only loaded when TechStack is visible)
          "vendor-r3f": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
            "@react-three/rapier",
          ],
          // GSAP
          "vendor-gsap": ["gsap"],
          // Icon packs
          "vendor-icons": ["react-icons"],
        },
      },
    },
    // Increase chunk warning limit since R3F/Three is intentionally large
    chunkSizeWarningLimit: 1500,
  },
});
