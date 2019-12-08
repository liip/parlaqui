<script>
    import { createEventDispatcher } from 'svelte'
    import { writable } from 'svelte/store'
    import { tweened } from 'svelte/motion'
    import politicians from '../councillors.json'
    let counter = 0
    // let politician = politicians[0]
    const dispatch = createEventDispatcher()
    let time = writable()
    let politician = {}
    let answers = []
    let rightAnswers = 0
    const maxAnswers = 10
    const maxTime = 10000

    function next() {
        generateAnswers()
        politician = answers.filter(a => a.right)[0]
        counter++
        time = tweened(1, { duration: maxTime, delay: 1000 })
        time.set(0)
        if(counter > maxAnswers) {
            dispatch('end', rightAnswers)
        }
    }
    next()
    
    function onAnswer(pol) {
        console.log($time)
        rightAnswers += pol.right * Math.floor($time * maxTime / 1000)
        next()
    }

    // random number in [min, max[
    function rand(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }
    
    function generateAnswers() {
        const maxAnswers = 4
        const arr = [...politicians]
        const res = []
        const rightAnswer = rand(0, maxAnswers)
        for(let i=0; i<maxAnswers; i++) {
            const index = rand(0, arr.length)
            const pol = arr.splice(index, 1)[0]
            pol.right = i === rightAnswer
            res.push(pol)
        }
        answers = res
    }
    function onKeydown(e) {
        switch(e.key) {
            case "1":
                onAnswer(answers[0])
                break
            case "2":
                onAnswer(answers[1])
                break
            case "3":
                onAnswer(answers[2])
                break
            case "4":
                onAnswer(answers[3])
                break
        }
    }
    
</script>
<svelte:window on:keydown={onKeydown} />
<h2>Wer bin ich?</h2>
<h3>{counter} / {politicians.length}</h3>
<img src={politician.ImageUrl} alt="image of">
<div>
    <progress value={$time} />
</div>
<div>
{#each answers as answer}
<button on:click={() => onAnswer(answer)}>{answer.FirstName} {answer.LastName}</button>
{/each}
</div>
{rightAnswers}
<style>
    progress {
        width: 100%;
    }
</style>