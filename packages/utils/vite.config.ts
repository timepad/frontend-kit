import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "@frontend-kit/utils",
      fileName: (format: string) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
  },
});
