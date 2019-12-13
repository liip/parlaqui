<script>
    export let items = []
</script>

<style>
    .progress-bar {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0;
    }
    .dot {
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        margin: 0.25rem;
        font-size: small;
        text-align: center;
        background-color: transparent;
        border-radius: 50%;
        border: 1px solid #ccc;
    }
    .true {
        background-color: #6EA644;
    }
    .false {
        background-color: #c02e00;
    }
</style>

<div class="progress-bar">
    {#each items as item}
    <div class={`dot ${item}`}></div>
    {/each}
</div>
