<div>
    {#each [...Array(7).keys()] as i}
        <img alt="" src="Pseudocode-Guide-J277/0{i}.jpg" />
    {/each}
</div>

<style>
    div {
        grid-column: 2;
        grid-row: 2;
        z-index: 90;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
</style>
