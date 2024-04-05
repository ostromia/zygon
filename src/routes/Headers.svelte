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
        display: flex;
        align-items: center;
        height: 1rem;
        padding: 0.125rem;
        box-sizing: border-box;
        gap: 0.25rem;
    }

    img {
        height: inherit;
    }

    span {
        color: lightgrey;
        font-family: 'Albert Sans';

        font-size: 0.9rem;
        line-height: 0.9rem;
    }
</style>
