import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: "./" يخلي الموقع يشتغل على GitHub Pages مهما كان اسم الـ repo
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
});
