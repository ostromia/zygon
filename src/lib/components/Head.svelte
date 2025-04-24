<script>
    import { VERSION } from "svelte/compiler";

    const title = "Zygon";
    const description = "Transpile GCSE & A-Level pseudocode into Python.";
    const canonicalURL = "https://ostromia.github.io/zygon/";
</script>

<svelte:head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="generator" content="Svelte {VERSION}" />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalURL} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
</svelte:head>
