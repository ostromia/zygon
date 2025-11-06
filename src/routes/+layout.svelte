<script lang="ts">
    import Head from "$lib/components/Head.svelte";

    let { children } = $props();
</script>

<Head />

{@render children()}

<style lang="scss">
    @use "@fontsource/atkinson-hyperlegible/index.css";

    $bc: #2e323b;
    $fc: #21252b;

    :global(html) {
        background-color: $bc;
    }

    :global(body) {
        margin: 0 !important;
        font-family: "Atkinson Hyperlegible", sans-serif;
    }
</style>
