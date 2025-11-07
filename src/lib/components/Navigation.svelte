<script lang="ts">
    interface Props {
        menubar: { name: string; items: { name: string; action: () => void }[] }[];
    }
    const { menubar }: Props = $props();

    let showDropdown = $state("");

    function toggle_dropdown(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            showDropdown = e.target.innerHTML;
        }
    }
</script>

<svelte:window onclick={toggle_dropdown} />

<nav>
    {#each menubar as menu}
        <div class="wrapper-nav-button">
            <button class="nav-button">
                {menu.name}
            </button>

            {#if showDropdown === menu.name}
                <div class="nav-dropdown">
                    {#each menu.items as menuitem}
                        <button onclick={menuitem.action}>
                            {menuitem.name}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
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
