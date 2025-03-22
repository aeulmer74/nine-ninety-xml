import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: ".",
    port: 3000,
    proxy: {
      "/irs-data": {
        target: "https://990-infrastructure.gtdata.org/irs-data",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/irs-data/, ""),
      },
      "/XmlFiles": {
        target:
          "https://gt990datalake-rawdata.s3.amazonaws.com/EfileData/XmlFiles",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/XmlFiles/, ""),
      },
    },
  },
});
