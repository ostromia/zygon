<script lang="ts">
    import Head from "$lib/components/Head.svelte";
    import "$lib/styles/app.scss";

    let { children } = $props();
</script>

<Head />

{@render children()}
