import { defineConfig } from "eslint/config";
import { fileURLToPath } from "url";
import path from "path";

import rootConfig from "../../eslint.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...rootConfig,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
]);
