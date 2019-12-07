<script>
    import { createEventDispatcher } from 'svelte'
    import { writable } from 'svelte/store'
    import { tweened } from 'svelte/motion'
    import politicians from '../councillors.json'
    let counter = 0
    let politician = politicians[0]
    const dispatch = createEventDispatcher()
    let time = tweened(1, { duration: 10000 })
    time.set(0)
    function next() {
        const index = Number.parseInt(Math.random()*politicians.length)
        politician = politicians[index]
        counter++
        time = tweened(1, { duration: 10000 })
        time.set(0)
        if(counter > 5) {
            dispatch('end')
        }
    }
</script>

<h2>Wer bin ich?</h2>
<h3>{counter} / {politicians.length}</h3>
<img src={politician.ImageUrl} alt="image of">
<div>
    <progress value={$time} />
</div>
<p>
<button on:click={next}>next</button>
</p>

<style>
    progress {
        width: 100%;
    }
</style>