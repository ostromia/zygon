<script>
	import { createEventDispatcher } from 'svelte';
	import { VPG_s } from '$r/stores';
	const dispatch = createEventDispatcher();
</script>

<nav>
	<span>Online OCR Pseudocode to Python Transpiler</span>

	<button on:click={() => dispatch('vPPP')}>
		View Past Paper Pseudocode
	</button>

	<button on:click={() => dispatch('vPG')}>
		{($VPG_s == false ? 'Show' : 'Hide') + ' Pseudocode Guide (J277)'}
	</button>

	<button on:click={() => dispatch('cPTP')}>
		Convert Pseudocode to Python
	</button>
</nav>

<style lang="scss">
	nav {
		height: 5vh;

		background-color: $fc;

		align-items: center;

		padding: 0.5rem;
		box-sizing: border-box;

		display: grid;
		grid-template-columns: 1fr repeat(3, auto);
		gap: 0.5rem;

		overflow-y: hidden;
		overflow-x: auto;
	}

	span {
		color: white;
		text-decoration: none;
		white-space: nowrap;
		font-size: 1.2rem;
		font-family: 'Trebuchet MS';
		cursor: default;
	}

	button {
		height: 3vh;

		color: white;
		background: #333842;

		font-family: 'consolas';

		border: 1;
		border-radius: 4px;
		border-color: #282c34;
		box-sizing: border-box;

		white-space: nowrap;
		cursor: pointer;
	}
</style>
