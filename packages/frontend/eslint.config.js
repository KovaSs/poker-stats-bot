import rootConfig from "../../eslint.config.js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  globalIgnores(["dist"]),
  ...rootConfig,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
    },
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);
