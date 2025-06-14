<script lang="ts">
    import { onMount } from "svelte";

    import { python as pythonLanguageSupport } from "@codemirror/lang-python";
    import "@fontsource/albert-sans";
    import { loadPyodide } from "pyodide";
    import type { PyodideInterface } from "pyodide";

    import CodeMirror from "$lib/components/CodeMirror.svelte";
    import Head from "$lib/components/Head.svelte";
    import Headers from "$lib/components/Headers.svelte";
    import J277Guide from "$lib/components/J277Guide.svelte";
    import Navigation from "$lib/components/Navigation.svelte";
    import { activeLeftTab, activeRightTab } from "$lib/stores";
    import { default as p2p } from "$lib/transpiler";

    let pseudoEditor = $state() as CodeMirror;
    let pythonEditor = $state() as CodeMirror;
    let pythonConsole = $state() as CodeMirror;
    let activeEditor = $state() as CodeMirror;

    let pyodide: PyodideInterface;

    function file_new() {
        if (pseudoEditor.getText().trim()) {
            const confirmation = confirm("Your changes will be lost if you don't save them.");
            if (confirmation) {
                pseudoEditor.setText("");
            }
        } else {
            pseudoEditor.setText("");
        }
    }

    async function file_open() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";

        const file: File = await new Promise((resolve, reject) => {
            input.onchange = () => {
                if (input.files && input.files[0]) {
                    resolve(input.files[0]);
                } else {
                    reject(new Error("No file selected"));
                }
            };
            input.click();
        });

        const file_text = await file.text();

        if (pseudoEditor.getText().trim()) {
            const confirmation = confirm("Your changes will be lost if you don't save them.");
            if (confirmation) {
                pseudoEditor.setText(file_text);
            }
        } else {
            pseudoEditor.setText(file_text);
        }
    }

    function save_text_as_file(text: string, fileName: string): void {
        const file = new Blob([text]);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function file_save_as_pseudocode() {
        save_text_as_file(pseudoEditor.getText(), "untitled.txt");
    }

    function file_save_as_python() {
        save_text_as_file(pythonEditor.getText(), "untitled.py");
    }

    function edit_undo() {
        if (activeEditor !== undefined) {
            activeEditor.undo();
        }
    }

    function edit_redo() {
        if (activeEditor !== undefined) {
            activeEditor.redo();
        }
    }

    async function edit_cut() {
        if (activeEditor !== undefined && activeEditor.isRange()) {
            const range = activeEditor.getRange();
            const selection = activeEditor.getText(...range);

            await navigator.clipboard.writeText(selection);
            activeEditor.setText("", ...range);
            activeEditor.focus();
        }
    }

    async function edit_copy() {
        if (activeEditor !== undefined && activeEditor.isRange()) {
            const range = activeEditor.getRange();
            const selection = activeEditor.getText(...range);

            await navigator.clipboard.writeText(selection);
        }
    }

    async function edit_paste() {
        if (activeEditor !== undefined) {
            activeEditor.setText(await navigator.clipboard.readText(), ...activeEditor.getRange());
        }
    }

    function view_pseudocode_editor() {
        $activeLeftTab = "pseudocodeEditor";
        activeEditor = pseudoEditor;
        activeEditor.focus();
    }

    function view_python_editor() {
        $activeRightTab = "pythonEditor";
        activeEditor = pythonEditor;
        activeEditor.focus();
    }

    function view_console() {
        $activeRightTab = "pythonConsole";
    }

    function view_pseudocode_guide_j277() {
        $activeRightTab = "pseudocodeGuide";
    }

    function view_past_paper_pseudocode() {
        pseudoEditor.setText(p2p.pastPaperPseudocode);
        pseudoEditor.setCursor(pseudoEditor.getEnd());
        pseudoEditor.focus();
    }

    function run_transpile_pseudocode_to_python() {
        const result = p2p.pseudocode2python(pseudoEditor.getText());

        if (result.success) {
            pythonConsole.setText("");
            pythonEditor.setText(result.data);
            pythonEditor.setCursor(pythonEditor.getEnd());
            pythonEditor.focus();
            view_python_editor();
        } else {
            pythonConsole.setText(result.error.message);
            pythonConsole.setCursor(pythonConsole.getEnd());
            pythonConsole.focus();
            view_console();
        }
    }

    async function run_interpret_python_code() {
        let output;

        try {
            await pyodide.runPythonAsync(`${pythonEditor.getText()}`);
            output = pyodide.runPython("sys.stdout.getvalue()");
            pyodide.runPython("sys.stdout = io.StringIO()");
        } catch (e) {
            if (e instanceof Error) {
                output = e.toString();
            }
        }

        pythonConsole.setText(output);
        $activeRightTab = "pythonConsole";
    }

    onMount(async () => {
        pyodide = await loadPyodide();
        await pyodide.runPythonAsync(`import io\nimport sys\nsys.stdout = io.StringIO()`);
    });
</script>

<Head />

<Navigation
    {file_new}
    {file_open}
    {file_save_as_pseudocode}
    {file_save_as_python}
    {edit_undo}
    {edit_redo}
    {edit_cut}
    {edit_copy}
    {edit_paste}
    {view_pseudocode_editor}
    {view_python_editor}
    {view_console}
    {view_pseudocode_guide_j277}
    {view_past_paper_pseudocode}
    {run_transpile_pseudocode_to_python}
    {run_interpret_python_code}
/>

<main>
    <Headers />

    <button class="wrapper-editor" onclick={() => (activeEditor = pseudoEditor)}>
        <CodeMirror bind:this={pseudoEditor} />
    </button>

    <button class="wrapper-editor" onclick={() => (activeEditor = pythonEditor)}>
        <CodeMirror bind:this={pythonEditor} filetype={[pythonLanguageSupport()]} display={$activeRightTab == "pythonEditor"} />
        <CodeMirror bind:this={pythonConsole} display={$activeRightTab == "pythonConsole"} linenumbers={false} editable={false} />
        <J277Guide />
    </button>
</main>

<style lang="scss">
    @use "../app.scss";

    main {
        height: calc(100vh - 2rem);
        overflow: hidden;

        padding: 0.25rem;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "h0 h1" "e0 e1";
        column-gap: 0.5rem;
    }

    .wrapper-editor {
        all: unset;
        display: grid;
        overflow: auto;

        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
