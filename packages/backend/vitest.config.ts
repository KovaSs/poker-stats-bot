import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["**/node_modules/**", "**/dist/**", "**/types/**"],
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
    passWithNoTests: true,
    environment: "node",
    testTimeout: 10000,
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
