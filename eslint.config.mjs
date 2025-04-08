import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  // ---> 1. Define global ignores first <---
  {
    ignores: [
      "client/build/**",
      "client/node_modules/**",
      "node_modules/**",
      "src/deprecated/**",
      "client/android/**",
      "client/public/service-worker.cjs",
    ],
  },

  // ---> 2. Define your linting rules for specific files <---
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // This will now apply *after* the ignores
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: react,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      // Add any other specific rules here
    },
  },
  // Add other configuration objects if needed (e.g., for TypeScript)
];

export default config;
