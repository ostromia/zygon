<script>
    import { createEventDispatcher } from 'svelte';
    import '@fontsource/albert-sans';
    import { showDropdown } from '$lib/stores/navigation.js';
    import { VPG_s } from '$r/stores';
    import Favicon from '$lib/Favicon.svelte';

    const dispatch = createEventDispatcher();

    let file_open_input;

    function toggle_dropdown(e) {
        $showDropdown = e.target.innerHTML.toLowerCase();
    }

    let files;
    $: if (files) {
        const text_ = files[0].text().then((e) => {
            dispatch('file_open', {
                text: e,
            });
        });
    }
</script>

<svelte:window on:click={toggle_dropdown} />

<!-- input element for file new -->
<input bind:this={file_open_input} bind:files style="display:none" type="file" accept=".txt" />

<!--
    `wrapper-nav-button` divs for file, edit, view and run sections
    each div contains `nav-button` and `nav-dropdown` elements
    `nav-dropdown` is conditionally rendered
-->

<nav id="mainmenu">
    <div class="wrapper-favicon">
        <Favicon width="1.4rem" />
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" on:click={toggle_dropdown}>File</button>
        {#if $showDropdown == 'file'}
            <div class="nav-dropdown">
                <button on:click={() => dispatch('file_new')}>New</button>
                <button on:click={file_open_input.click()}>Open</button>
                <button on:click={() => dispatch('file_save_as_pseudocode')}>Save As... (Pseudocode)</button>
                <button on:click={() => dispatch('file_save_as_python')}>Save As... (Python)</button>
            </div>
        {/if}
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" on:click={toggle_dropdown}>Edit</button>
        {#if $showDropdown == 'edit'}
            <div class="nav-dropdown">
                <button on:click={() => dispatch('edit_undo')}>Undo</button>
                <button on:click={() => dispatch('edit_redo')}>Redo</button>
                <button on:click={() => dispatch('edit_cut')}>Cut</button>
                <button on:click={() => dispatch('edit_copy')}>Copy</button>
                <button on:click={() => dispatch('edit_paste')}>Paste</button>
            </div>
        {/if}
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" on:click={toggle_dropdown}>View</button>
        {#if $showDropdown == 'view'}
            <div class="nav-dropdown">
                <button on:click={() => dispatch('view_view_past_paper_pseudocode')}>View Past Paper Pseudocode</button>
                <button on:click={() => dispatch('view_toggle_pseudocode_guide_j277')}>Toggle Pseudocode Guide (J277)</button>
            </div>
        {/if}
    </div>

    <div class="wrapper-nav-button">
        <button class="nav-button" on:click={toggle_dropdown}>Run</button>
        {#if $showDropdown == 'run'}
            <div class="nav-dropdown">
                <button on:click={() => dispatch('run_transpile_pseudocode_to_python')}>Transpile Pseudocode to Python</button>
                <!-- <button on:click={() => dispatch("run_interpret_python_code")}>Interpret Python Code</button> -->
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
