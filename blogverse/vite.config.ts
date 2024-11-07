import { defineConfig } from "vite";

export default defineConfig({
 server: {
  proxy: {
   "/v1": {
    target: "http://cloud.appwrite.io", // The Appwrite server
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/v1/, "/v1"),
   },
  },
 },
});
