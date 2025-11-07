import { execSync } from "child_process";
import { rmSync, readdirSync, statSync, renameSync } from "fs";
import { join, resolve } from "path";

function run(command: string) {
    execSync(command, { stdio: "inherit" });
}

function cleanBuildBranch() {
    const cwd = resolve(".");
    const entries = readdirSync(cwd);
    const protected_entries = [
        ".git",
        ".gitignore",
        ".svelte-kit",
        ".vscode",
        "node_modules",
        "build"
    ];

    for (const i of entries) {
        if (!protected_entries.includes(i)) {
            const path = join(cwd, i);
            const stats = statSync(path);

            if (stats.isDirectory()) {
                rmSync(path, { recursive: true, force: true });
            } else {
                rmSync(path);
            }
        }
    }
}

function flattenFolder(path: string) {
    const entries = readdirSync(path);

    for (const i of entries) {
        const from = join(path, i);
        const to = join(".", i);
        renameSync(from, to);
    }

    rmSync(path, { recursive: true, force: true });
}

function getDateTime() {
    return new Date()
        .toLocaleString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "UTC",
            timeZoneName: "short"
        })
        .replace(",", "")
        .replace(" at", "");
}

run("npm run build");

try {
    run("git switch build");
} catch {
    run("git checkout --orphan build");
}

cleanBuildBranch();
flattenFolder(resolve("build"));

run("git add --all");
run(`git commit -m "${getDateTime()}"`);

try {
    run("git push");
} catch {
    run("git push --set-upstream origin build");
}

run("git switch main");
