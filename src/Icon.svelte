<script>
    export let name = 'logo'
    export let size = 200
    $: className = `icon icon--${name}`
    $: sizePixel = Number.parseInt(24 * size / 100)
    $: style = `width: ${sizePixel}px;` 
</script>

<style>
.icon {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -1px;
    fill: currentColor;
}
.icon--close {
  stroke-width: 2px;
  stroke: #000; 
}
</style>
<svg class={className} style={style}>
  <use xlink:href="icons.svg#{name}" />
</svg>