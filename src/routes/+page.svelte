<script lang="ts">
    import Navigation from '$lib/components/Navigation.svelte';
    import CodeMirror from '$lib/components/CodeMirror.svelte';
    import Headers from '$lib/components/Headers.svelte';
    import J277Guide from '$lib/components/J277Guide.svelte';

    import { python as pythonLanguageSupport } from "@codemirror/lang-python";

    import { showGuide } from "$lib/stores";

    import { default as p2p } from '$lib/transpiler';

    let pseudoEditor = $state() as CodeMirror;
    let pythonEditor = $state() as CodeMirror;
    let activeEditor = $state() as CodeMirror;

    function file_new() {
        if (pseudoEditor.getText().trim()) {
            const confirmation = confirm("Your changes will be lost if you don't save them.");
            if (confirmation) {
                pseudoEditor.setText("");
            }
        }
        else {
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
        }

        else {
            pseudoEditor.setText(file_text);
        }
    }

    function save_text_as_file(text: string, fileName: string): void {
        const file = new Blob([ text ]);
        const a = document.createElement('a');
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
            activeEditor.setText(
                await navigator.clipboard.readText(),
                ...activeEditor.getRange()
            );
        }
    }

    function view_view_past_paper_pseudocode() {
        pseudoEditor.setText(p2p.pastPaperPseudocode);
    }

    function view_toggle_pseudocode_guide_j277() {
        showGuide.update(i => !i);
    }

    function run_transpile_pseudocode_to_python() {
        const PSEUDOARRAY = p2p.toArray(pseudoEditor.getText());
        const ERROR = p2p.validator(PSEUDOARRAY);
        if (ERROR === '') {
            pythonEditor.setSyntax([pythonLanguageSupport()]);
            const PYTHONARRAY = p2p.transpiler(PSEUDOARRAY);
            pythonEditor.setText(p2p.toString(PYTHONARRAY));
        }
        else {
            pythonEditor.setSyntax([]);
            pythonEditor.setText(ERROR);
        }
    }

    function run_interpret_python_code() {
    }
</script>

<svelte:head>
    <title>Zygon</title>
</svelte:head>

<Navigation
    file_new={file_new}
    file_open={file_open}
    file_save_as_pseudocode={file_save_as_pseudocode}
    file_save_as_python={file_save_as_python}

    edit_undo={edit_undo}
    edit_redo={edit_redo}
    edit_cut={edit_cut}
    edit_copy={edit_copy}
    edit_paste={edit_paste}

    view_view_past_paper_pseudocode={view_view_past_paper_pseudocode}
    view_toggle_pseudocode_guide_j277={view_toggle_pseudocode_guide_j277}

    run_transpile_pseudocode_to_python={run_transpile_pseudocode_to_python}
    run_interpret_python_code={run_interpret_python_code}
/>

{#if $showGuide}
    <main style="position: absolute">
        <J277Guide/>
    </main>
{/if}

<main>
    <Headers/>

    <button class="wrapper-editor" onclick={() => activeEditor = pseudoEditor}>
        <CodeMirror bind:this={pseudoEditor}/>
    </button>

    <button class="wrapper-editor" onclick={() => activeEditor = pythonEditor}>
        <CodeMirror bind:this={pythonEditor} filetype={[pythonLanguageSupport()]}/>
    </button>
</main>

<style lang="scss">
    @import "../app.scss";

    main {
        height: calc(100vh - 2rem);

        padding: 0.25rem;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: 1rem 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'h0 h1' 'e0 e1';
        gap: 0.25rem;
    }

    .wrapper-editor {
        all: unset;
        display: grid;
        overflow: auto;
    }
</style>
