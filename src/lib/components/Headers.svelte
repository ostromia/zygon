<script>
    import { activeLeftTab, activeRightTab } from "$lib/stores";

    const activeTabColor = "#282c34";
    const inactiveTabColor = "#3a4049";

    const python_logo = "devicons/python.svg";
    const ocr_logo = "devicons/ocr-logo.svg";
</script>

<div id="left-tabs">
    <button class="tab" onclick={() => ($activeLeftTab = "pseudocodeEditor")} style:background-color={$activeLeftTab == "pseudocodeEditor" ? activeTabColor : inactiveTabColor}>
        <img alt="" src={ocr_logo} />
        <span>Pseudocode</span>
    </button>
</div>

<div id="right-tabs">
    <button class="tab" onclick={() => ($activeRightTab = "pythonEditor")} style:background-color={$activeRightTab == "pythonEditor" ? activeTabColor : inactiveTabColor}>
        <img alt="" src={python_logo} />
        <span>Python</span>
    </button>

    <button class="tab" onclick={() => ($activeRightTab = "pseudocodeGuide")} style:background-color={$activeRightTab == "pseudocodeGuide" ? activeTabColor : inactiveTabColor}>
        <img alt="" src={ocr_logo} />
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

        background-color: #282c34;

        > img {
            height: 1rem;
        }

        > span {
            color: lightgrey;
            font-family: "Albert Sans";

            font-size: 0.9rem;
            line-height: 0.9rem;
        }
    }
</style>
