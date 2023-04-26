<script>
	import { createEventDispatcher } from 'svelte';
	import "@fontsource/jetbrains-mono"
	import { VPG_s } from '$r/stores';
	const dispatch = createEventDispatcher();

	let screenX;
	const medialevel = [1115, 774];
</script>

<svelte:window bind:innerWidth={screenX}/>

<nav>
	<span>
		{
			'Zygon'
			+ (screenX > medialevel[0] ? ': Pseudocode to Python Transpiler ' : '')
			+ '🦑'
		}
	</span>

	<button on:click={() => dispatch('vPPP')}>
		{
			'View Past Paper'
			+ (screenX > medialevel[1] ? 'Pseudocode' : '')}
	</button>

	<button on:click={() => dispatch('vPG')}>
		{
			($VPG_s == false ? 'Show' : 'Hide')
			+ (screenX > medialevel[1] ? ' Pseudocode Guide (J277)' : ' Guide')
		}
	</button>

	<button on:click={() => dispatch('cPTP')}>
		{screenX > medialevel[1] ? "Transpile Pseudocode to Python" : "Transpile"}
	</button>
</nav>

<style lang="scss">
	nav {
		height: 2.5rem;
		background-color: $fc;
		align-items: center;
		// overflow: hidden;

		padding: 0 0.5rem;
		box-sizing: border-box;

		display: grid;
		grid-template-columns: 1fr repeat(3, auto);
		gap: 0.5rem;
	}

	span {
		color: white;
		text-decoration: none;
		white-space: nowrap;
		font-size: 1rem;
		line-height: 2rem;
		font-family: "JetBrains Mono";
		cursor: default;
	}

	button {
		color: white;
		background: #333842;

		height: 1.5rem;
		line-height: 1rem;
		font-size: 0.8rem;
		font-family: 'consolas';

		border: 1;
		border-radius: 4px;
		border-color: #282c34;
		box-sizing: border-box;

		white-space: nowrap;
		cursor: pointer;
	}
</style>
