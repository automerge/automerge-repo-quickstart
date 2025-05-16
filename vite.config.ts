// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import wasm from "vite-plugin-wasm"

export default defineConfig({
  base: "/",

  build: {
    target: "esnext",
  },

  plugins: [wasm(), react()],

  worker: {
    format: "es",
    plugins: () => [wasm()],
  },
})
