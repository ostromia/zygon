import { sveltekit } from "@sveltejs/kit/vite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export function viteStaticCopyPyodide() {
    const PYODIDE_EXCLUDE = ["!**/*.{md,html}", "!**/*.d.ts", "!**/*.whl", "!**/node_modules"];
    const pyodideDir = dirname(fileURLToPath(import.meta.resolve("pyodide")));
    return viteStaticCopy({
        targets: [
            {
                src: [join(pyodideDir, "*")].concat(PYODIDE_EXCLUDE),
                dest: "_app/immutable/nodes/"
            }
        ]
    });
}

// https://ostromia.github.io/zygon/_app/immutable/nodes/pyodide-lock.json

export default defineConfig({
    plugins: [sveltekit(), viteStaticCopyPyodide()],
    optimizeDeps: { exclude: ["pyodide"] }
});
