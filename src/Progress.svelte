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
        flex-wrap: wrap;
        padding: 0;
        margin-bottom: 1rem;
    }
    .dot {
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.0rem;
        margin: 0.2rem;
        font-size: small;
        text-align: center;
        background-color: transparent;
        border-radius: 50%;
        border: 1px solid #2c3e5020;
        transition: background-color 250ms linear;
    }
    .true {
        color: white;
        background-color: #6EA644;
    }
    .false {
        color: transparent;
        background-color: #2c3e5020;
    }
    .current {
        border-color: #2c3e50;
    }
    .current.false {
        border-color: #2c3e5020;
    }
    .current.true {
        border-color: #6EA644;
    }
    @media (max-width: 360px) {
        .progress-bar {
            margin-bottom: 0.5rem;
        }
    }
</style>

<div class="progress-bar">
    {#each items as item, index}
    <div class={getClass(item, index) + (index === round ? ' current' : '')}>
        {index === round ? score : (item > 0) ? item : ''}
    </div>
    {/each}
</div>
