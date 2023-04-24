<script>
	import { VPG_s } from '$r/stores';

	const python_logo = 'devicons/python.svg';
	const ocr_logo = 'devicons/ocr-logo.svg';
</script>

<div>
	<img alt="" src={ocr_logo}>
	<span>Pseudocode</span>
</div>

<div>
	<img alt="" src={$VPG_s ? ocr_logo : python_logo}>
	<span>{$VPG_s ? 'Pseudocode Guide' : 'Python'}</span>
</div>

<style lang="scss">
	div {
		width: 100%;

		display: flex;
		align-content: center;

		align-items: center;
	}

	img {
		height: 3vh;
	}

	span {
		font-size: 2vh;
		font-family: 'Trebuchet MS';
		color: white;
		margin-left: 0.5vw;
	}
</style>
