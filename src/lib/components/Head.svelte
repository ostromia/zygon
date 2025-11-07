<script lang="ts">
    import { VERSION } from "svelte/compiler";
    import favicon from "$lib/assets/favicon.png";

    const title = "Zygon";
    const description = "Transpile GCSE & A-Level pseudocode into Python.";
    const canonical = "https://ostromia.github.io/zygon/";
</script>

<svelte:head>
    <!-- Global Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={`SvelteKit ${VERSION}`} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Favicon -->
    <link rel="image/png" href={favicon} />
    <link rel="apple-touch-icon" sizes="180x180" href={favicon} />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonical} />
</svelte:head>
