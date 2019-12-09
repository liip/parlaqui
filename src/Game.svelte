<script>
    import { createEventDispatcher, onDestroy } from 'svelte'
    import { readable } from 'svelte/store'
    import { tweened } from 'svelte/motion'
    import politicians from '../councillors.json'
    let counter = 0
    const dispatch = createEventDispatcher()
    let time = readable()
    let politician = {}
    let answers = []
    let rightAnswers = 0
    let showResults = false
    const maxAnswers = 10
    const maxTime = 10000
    let timer
    let answerTimer

    onDestroy(() => {
        clearTimeout(timer)
        clearTimeout(answerTimer)
    })
    
    function next() {
        generateAnswers()
        politician = answers.filter(a => a.wright)[0]
        counter++
        time = tweened(1, { duration: maxTime, delay: 1000 })
        time.set(0)
        
        timer = setTimeout(() => {
            onAnswer({ wright: false })
        }, maxTime + 1000)

        if(counter > maxAnswers) {
            dispatch('end', rightAnswers)
        }
    }
    next()
    
    function onAnswer(answer) {
        if(showResults) {
            return
        }
        clearTimeout(timer)
        showAnswers()    
        rightAnswers += answer.wright * Math.floor($time * maxTime / 1000)
        time = readable($time)
    }

    // random number in [min, max[
    function rand(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }
    
    function generateAnswers() {
        const maxAnswers = 4
        // random take on item to filter by gender or the answers are too obvious
        const filter = politicians[rand(0, politicians.length)]
        
        const arr = [...politicians.filter(p => p.GenderAsString === filter.GenderAsString)]
        const res = []
        const wrightAnswer = rand(0, maxAnswers)
        for(let i=0; i<maxAnswers; i++) {
            const index = rand(0, arr.length)
            const pol = arr.splice(index, 1)[0]
            pol.wright = i === wrightAnswer
            res.push(pol)
        }
        answers = res
    }
    function showAnswers() {
        showResults = true
        answerTimer = setTimeout(() => {
            showResults = false
            next()
        }, 1000)
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
            case "Escape":
                dispatch('end', null)
                break
        }
    }
</script>
<svelte:window on:keydown={onKeydown} />
<section>
<img src={politician.ImageUrl} alt="image of">
<div>
    <progress value={$time} />
</div>
<div class="buttons">
{#each answers as answer}
<button on:click={() => onAnswer(answer)} class={showResults ? (answer.wright ? 'wright' : 'wrong') : ''}>{answer.FirstName} {answer.LastName}</button>
{/each}
</div>
Score: {rightAnswers}
</section>
<style>
    .buttons {
        padding-top: 1rem;
    }
    button {
        width: 100%;
    }
    button:focus {
        outline: 0;
        border-color: #ccc;
    }
    section {
        text-align: center;
    }
    progress {
        width: 100%;
    }
    .wrong {
        background-color: red;
    }
    .wright {
        background-color: green;
    }
    img {
        width: 260px;
        height: 260px;
        border-radius: 50%;
    }
</style>