import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.next/**",
      "**/out/**",
      "result.md",
      "parser.js",
      "history.json",
      "result.json",
    ],
  },
  // Основные правила для TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
  // Сортировка через perfectionist (только для TypeScript)
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          type: "line-length", // сортировка по длине строки
          order: "desc", // от самой длинной к самой короткой
          groups: [
            ["builtin", "external"], // node:fs, path и т.д. и сторонние пакеты
            "internal", // алиасы @/...
            "parent", // ../..
            "sibling", // ./
            "index", // ./index
            "type", // import type
            "side-effect-style", // import './styles.css'
            "style", // import styles from './styles.module.css'
          ],
          internalPattern: ["^@/"], // подхватывает наш алиас @/
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          type: "line-length",
          ignoreCase: true,
          order: "desc",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          type: "line-length",
          ignoreCase: true,
          order: "desc",
        },
      ],
    },
  },
  // Отключаем no-console на бэкенде
  {
    files: ["packages/backend/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
]);
