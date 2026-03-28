import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    passWithNoTests: true,
    environment: "node",
    globals: true,
    coverage: {
      exclude: ["**/node_modules/**", "**/dist/**", "**/types/**"],
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
