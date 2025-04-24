<script lang="ts">
    import '@fontsource/albert-sans';
    import { showDropdown } from '$lib/stores';
    import Favicon from '$lib/components/Favicon.svelte';

    function toggle_dropdown(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            $showDropdown = e.target.innerHTML;
        }
    }

    let {
        file_new,
        file_open,
        file_save_as_pseudocode,
        file_save_as_python,
        edit_undo,
        edit_redo,
        edit_cut,
        edit_copy,
        edit_paste,
        view_view_past_paper_pseudocode,
        view_toggle_pseudocode_guide_j277,
        run_transpile_pseudocode_to_python,
        run_interpret_python_code
    } = $props();
</script>

<svelte:window onclick={toggle_dropdown} />

<nav id="mainmenu">
    <div class="wrapper-favicon">
        <Favicon width="1.4rem" color="white" />
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" onclick={toggle_dropdown}>File</button>
        {#if $showDropdown == 'File'}
            <div class="nav-dropdown">
                <button onclick={file_new}>New</button>
                <button onclick={file_open}>Open</button>
                <button onclick={file_save_as_pseudocode}>Save As... (Pseudocode)</button>
                <button onclick={file_save_as_python}>Save As... (Python)</button>
            </div>
        {/if}
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" onclick={toggle_dropdown}>Edit</button>
        {#if $showDropdown == 'Edit'}
            <div class="nav-dropdown">
                <button onclick={edit_undo}>Undo</button>
                <button onclick={edit_redo}>Redo</button>
                <button onclick={edit_cut}>Cut</button>
                <button onclick={edit_copy}>Copy</button>
                <button onclick={edit_paste}>Paste</button>
            </div>
        {/if}
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" onclick={toggle_dropdown}>View</button>
        {#if $showDropdown == 'View'}
            <div class="nav-dropdown">
                <button onclick={view_view_past_paper_pseudocode}>View Past Paper Pseudocode</button>
                <button onclick={view_toggle_pseudocode_guide_j277}>Toggle Pseudocode Guide (J277)</button>
            </div>
        {/if}
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" onclick={toggle_dropdown}>Run</button>
        {#if $showDropdown == 'Run'}
            <div class="nav-dropdown">
                <button onclick={run_transpile_pseudocode_to_python}>Transpile Pseudocode to Python</button>
                <!-- <button onclick={run_interpret_python_code}>Interpret Python Code</button> -->
            </div>
        {/if}
    </div>
</nav>

<style lang="scss">
    nav {
        height: 2rem;
        background-color: #21252b;
        padding: 0 0.5rem;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .wrapper-favicon {
        height: 2rem;
        display: flex;
        align-items: center;
        padding-right: 0.5rem;
        box-sizing: border-box;
    }

    .wrapper-nav-button {
        height: 1.5rem;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
    }

    .wrapper-nav-button:hover {
        background-color: rgba(128, 128, 128, 0.2);
    }

    .nav-button {
        // unset default values
        border: unset;
        background-color: unset;

        color: lightgrey;
        font-family: 'Albert Sans';

        font-size: 0.8rem;
        line-height: 0.8rem;

        padding: 0 0.5rem;

        border-radius: 0.25rem;
    }

    .nav-dropdown {
        display: flex;
        position: absolute;

        flex-direction: column;

        top: 2rem;
        z-index: 99;

        background-color: #353b45;

        border-radius: 0.25rem;
    }

    .nav-dropdown > button {
        // unset default values
        border: unset;
        background-color: unset;

        color: lightgrey;
        font-family: 'Albert Sans';

        text-align: left;

        padding: 0.25rem 1rem;
        box-sizing: border-box;

        border-radius: 0.25rem;

        cursor: pointer;
    }

    .nav-dropdown > button:hover {
        background-color: rgba(128, 128, 128, 0.2);
    }
</style>
