<script>
    import { userstate } from "$lib/state.svelte";

    import { github, ocr, python, terminal } from "$lib/assets/icons";

    const activeTabColor = "#282c34";
    const inactiveTabColor = "#3a4049";

    // const python_logo = "devicons/python.svg";
    // const terminal_logo = "devicons/terminal.svg";
    // const ocr_logo = "devicons/ocr-logo.svg";
</script>

<div id="left-tabs">
    <button
        class="tab"
        onclick={() => (userstate.activeLeftTab = "pseudocodeEditor")}
        style:background-color={userstate.activeLeftTab == "pseudocodeEditor"
            ? activeTabColor
            : inactiveTabColor}
    >
        <img alt="" src={ocr} />
        <span>Pseudocode</span>
    </button>
</div>

<div id="right-tabs">
    <button
        class="tab"
        onclick={() => (userstate.activeRightTab = "pythonEditor")}
        style:background-color={userstate.activeRightTab == "pythonEditor"
            ? activeTabColor
            : inactiveTabColor}
    >
        <img alt="" src={python} />
        <span>Python</span>
    </button>

    <button
        class="tab"
        onclick={() => (userstate.activeRightTab = "pythonConsole")}
        style:background-color={userstate.activeRightTab == "pythonConsole"
            ? activeTabColor
            : inactiveTabColor}
    >
        <img alt="" src={terminal} />
        <span>Console</span>
    </button>

    <button
        class="tab"
        onclick={() => (userstate.activeRightTab = "pseudocodeGuide")}
        style:background-color={userstate.activeRightTab == "pseudocodeGuide"
            ? activeTabColor
            : inactiveTabColor}
    >
        <img alt="" src={ocr} />
        <span>{"Pseudocode Guide"}</span>
    </button>
</div>

<style lang="scss">
    #left-tabs,
    #right-tabs {
        display: flex;
        align-items: center;
        height: 1.5rem;
        box-sizing: border-box;
        gap: 0.5rem;
    }

    .tab {
        all: unset;

        height: inherit;

        display: flex;
        align-items: center;
        gap: 0.25rem;

        padding: 0.5rem;
        box-sizing: border-box;

        > img {
            height: 1rem;
        }

        > span {
            color: lightgrey;

            font-size: 0.9rem;
            line-height: 0.9rem;
        }
    }
</style>
