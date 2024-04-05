<script context="module" lang="ts">
    function isEmptyString(x: string): boolean {
        return /^\s*$/.test(x);
    }
</script>

<script lang="ts">
    import Navigation from '$r/Navigation.svelte';
    import CodeMirror from '$r/CodeMirror.svelte';
    import Headers from '$r/Headers.svelte';
    import J277Guide from '$r/J277Guide.svelte';

    import { python as pythonLanguageSupport } from "@codemirror/lang-python";

    import { VPG_s } from '$r/stores';

    import { default as p2p } from '$lib/transpiler';

    let pseudoEditor: CodeMirror;
    let pythonEditor: CodeMirror;
    let activeEditor: CodeMirror;

    function file_new() {
        if (!isEmptyString(pseudoEditor.getText())) {
            window.alert("Your changes will be lost if you don't save them.");
        }
        pseudoEditor.setText("");
    }

    function file_open(e: any) {
        if (!isEmptyString(pseudoEditor.getText())) {
            window.alert("Your changes will be lost if you don't save them.");
        }
        pseudoEditor.setText(e.detail.text);
    }

    function save_text_as_file(text: string, fileName: string): void {
        let file = new Blob([ text ]);
        let a = document.createElement('a');
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
        if (activeEditor !== undefined && activeEditor.isRange()) {
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
        VPG_s.update(i => !i);
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
    on:file_new={file_new}
    on:file_open={file_open}
    on:file_save_as_pseudocode={file_save_as_pseudocode}
    on:file_save_as_python={file_save_as_python}

    on:edit_undo={edit_undo}
    on:edit_redo={edit_redo}
    on:edit_cut={edit_cut}
    on:edit_copy={edit_copy}
    on:edit_paste={edit_paste}

    on:view_view_past_paper_pseudocode={view_view_past_paper_pseudocode}
    on:view_toggle_pseudocode_guide_j277={view_toggle_pseudocode_guide_j277}

    on:run_transpile_pseudocode_to_python={run_transpile_pseudocode_to_python}
    on:run_interpret_python_code={run_interpret_python_code}
/>

<main style="position: absolute">
    <J277Guide/>
</main>

<main>
    <Headers/>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => activeEditor = pseudoEditor} class="wrapper-editor">
        <CodeMirror bind:this={pseudoEditor}/>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => activeEditor = pythonEditor} class="wrapper-editor">
        <CodeMirror bind:this={pythonEditor} filetype={[pythonLanguageSupport()]}/>
    </div>
</main>

<style lang="scss">
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
        display: grid;
        overflow: auto;
    }
</style>
