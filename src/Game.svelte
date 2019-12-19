<script>
    import { createEventDispatcher, onDestroy } from 'svelte'
    import { readable } from 'svelte/store'
    import { fly, crossfade } from 'svelte/transition'
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion'
    import { rand } from './util'
    import politicians from '../councillors.json'
    import { t } from './i18n'
    import tracking from './tracking'
    import Progress from './Progress.svelte'
    import Avatar from './Avatar.svelte'

    const dispatch = createEventDispatcher()
    const maxRounds = 10
    const maxTime = maxRounds * 1000
    const maxAnswers = 4
    let round = 0
    let time = readable()
    let politician = {}
    let answers = []
    let score = 0
    let showResults = false
    let timer
    let answerTimer
    let progress = new Array(maxRounds)
    $: currentScore = Math.floor($time * 10)

    onDestroy(() => {
        clearTimeout(timer)
        clearTimeout(answerTimer)
    })
    
    next()
    
    function next() {
        generateAnswers()
        round++
        time = tweened(1, { duration: maxTime, delay: 1000 })
        time.set(0)
        
        timer = setTimeout(() => {
            onAnswer({ wright: false, })
        }, maxTime + 1000)

        if(round > maxRounds) {
            dispatch('end', score)
        }
    }
    
    function onAnswer(answer) {
        if(showResults) {
            return
        }
        clearTimeout(timer)
        showAnswers()
        let points = 0
        if(answer.wright) {
            points = currentScore
        } else {
            currentScore = 0
        }
        score += points
        progress[round-1] = points
        time = readable($time)
    }

    function generateAnswers() {
        // randomly take one item to set the gender
        const filter = politicians[rand(0, politicians.length)]
        // filter by gender, or answers could be too obvious
        const arr = [...politicians.filter(p => p.GenderAsString === filter.GenderAsString)]
        const res = []
        const wrightAnswer = rand(0, maxAnswers)
        for(let i=0; i<maxAnswers; i++) {
            const index = rand(0, arr.length)
            const answer = arr.splice(index, 1)[0]
            answer.wright = i === wrightAnswer
            res.push(answer)
        }
        answers = res
        politician = answers.filter(a => a.wright)[0]
    }

    function showAnswers() {
        showResults = true
        answerTimer = setTimeout(() => {
            answers = []
            showResults = false
            next()
        }, 1000)
    }
</script>
<style>
    .buttons {
        padding-top: 1rem;
    }
    button {
        width: 100%;
        transition: background-color 100ms linear;
    }
    button:focus {
        outline: 0;
    }
    section {
        text-align: center;
    }
    .wrong {
        color: #ccc;
        background-color: transparent;
    }
    .wright {
        color: white;
        background-color: #6EA644;
    }
</style>

<section>
    <Avatar url={politician.ImageUrl} value={1 - $time} />
    <div>
        <Progress items={progress} score={currentScore} round={round-1} />
    </div>
    <div class="buttons">
        {#each answers as answer, index }
        <button
            on:click={() => onAnswer(answer)} 
            class={showResults ? (answer.wright ? 'wright' : 'wrong') : ''}
        >
            {answer.FirstName} {answer.LastName} ({$t('party', answer.Party)})
        </button>
        {/each}
    </div>
</section>
