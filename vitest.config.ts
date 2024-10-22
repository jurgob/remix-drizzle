import { defineConfig } from "vitest/config";
import { loadEnv } from 'vite'

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ['./tests/setup.ts'],
    env: loadEnv('test', process.cwd(), ''),
  },
});