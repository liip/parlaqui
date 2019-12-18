<script>
    export let items = []
    export let score = null
    export let round = 0

    const getClass = (item, index) => {
        let name = 'dot '
        if(item !== undefined) {
            name += item > 0
        }
        return name
    }
</script>

<style>
    .progress-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 0;
    }
    .dot {
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        margin: 0.25rem;
        font-size: small;
        text-align: center;
        background-color: transparent;
        border-radius: 50%;
        border: 1px solid #ccc;
        transition: width 250ms linear, height 250ms linear;
    }
    .true {
        color: white;
        background-color: #6EA644;
    }
    .false {
        color: white;
        background-color: #c02e00;
    }
    .current {
        border-color: #2c3e50;
    }
</style>

<div class="progress-bar">
    {#each items as item, index}
    <div class={getClass(item, index) + (index === round ? ' current' : '')}>
        {index === round ? score : (item !== undefined) ? item : ''}
    </div>
    {/each}
</div>
