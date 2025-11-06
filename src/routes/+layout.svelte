<script lang="ts">
    import Head from "$lib/components/Head.svelte";
    import "@fontsource/albert-sans";

    let { children } = $props();
</script>

<Head />

{@render children()}

<style lang="scss">
    $bc: #2e323b;
    $fc: #21252b;

    :global(html) {
        background-color: $bc;
    }

    :global(body) {
        margin: 0 !important;
    }
</style>
