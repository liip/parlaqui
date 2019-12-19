<script>
    export let url = ''
    export let value = 0
    const u = Math.PI * 125 * 2 - 0.1
    $: offset = u * value
    $: style = `stroke-dashoffset: ${offset}px; stroke-dasharray: ${u}px; opacity: ${1-value}`
</script>
<style>
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%; 
    }
    svg {
        position: absolute;
        top: -10px;
        left: -10px;
        stroke: #2c3e50;
        fill: transparent;
        stroke-width: 10px;
        width: 220px;
        height: 220px;
        transform: rotateY(-180deg) rotateZ(-90deg);
    }
    .avatar {
        position: relative;
        display: inline-block;
        margin-bottom: 1rem;
    }
    @media (max-width: 360px) {
        .avatar {
            margin-bottom: 0.5rem;
        }
    }
</style>
<div class="avatar">
    <img src={url} alt="image of">
    <svg viewBox="-130 -130 260 260">
        <circle cx="0" cy="0" r="125" style={style} />
    </svg>
</div>
