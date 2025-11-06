<script lang="ts">
    import Head from "$lib/components/Head.svelte";

    let { children } = $props();
</script>

<Head />

{@render children()}

<style lang="scss">
    @use "@fontsource/atkinson-hyperlegible/index.css";
    @use "$lib/styles/colors";

    :global(html),
    :global(body) {
        height: 100%;
        background-color: colors.$background;
    }

    :global(body) {
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 0;
        font-family: "Atkinson Hyperlegible", sans-serif;
    }
</style>
