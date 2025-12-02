import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pluginSecurity = require('eslint-plugin-security');

export default defineConfig([
  {
    ignores: [
      'node_modules/',
      'package-lock.json',
      'coverage/',
      // Dossiers et fichiers générés (CRUCIAL)
      'dist/',          // Dossier de sortie de Rollup/Babel
      'build/',         // Autre nom courant pour les builds            
      // Fichiers de configuration spécifiques (souvent inutiles à linter)
      'rollup.config.js',
      'babel.config.json',
    ]
  },
  pluginSecurity.configs.recommended,
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
