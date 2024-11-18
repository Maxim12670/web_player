import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "src/app"),
            "@features": path.resolve(__dirname, "src/features"),
            "@entities": path.resolve(__dirname, "src/entities"),
            "@shared": path.resolve(__dirname, "src/shared"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@widgets": path.resolve(__dirname, "src/widgets"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"],
            },
        },
    },
});
