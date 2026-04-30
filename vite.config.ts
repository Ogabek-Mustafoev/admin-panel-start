import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom"))
              return "react-vendor";
            if (id.includes("antd") || id.includes("@ant-design")) return "antd";
            if (id.includes("rc-")) return "antd-rc";
            if (id.includes("@reduxjs") || id.includes("react-redux")) return "redux";
            if (id.includes("@tanstack")) return "query";
            if (id.includes("@dnd-kit")) return "dnd";
            if (id.includes("i18next")) return "i18n";
            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("yup")) return "form";
            if (id.includes("axios") || id.includes("lodash") || id.includes("qs") || id.includes("idb"))
              return "utils";
            if (
              id.includes("react-toastify") ||
              id.includes("react-dropzone") ||
              id.includes("react-icons") ||
              id.includes("react-international-phone")
            )
              return "ui-extra";
          }
        },
      },
    },
  },
});
