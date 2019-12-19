<script>
    import { createEventDispatcher, onDestroy } from 'svelte'
    import { readable } from 'svelte/store'
    import { fly, crossfade } from 'svelte/transition'
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion'
    import { rand } from './util'
    import data from '../councillors.json'
    import { t } from './i18n'
    import tracking from './tracking'
    import Progress from './Progress.svelte'
    import Avatar from './Avatar.svelte'
    
    export let councils = []
    let politicians = data.filter(p => councils.includes(p.Council))
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
    let isWrong = false;
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
        
        isWrong = answer.ID !== politician.ID
        let points = 0
        if(answer.wright) {
            points = Math.floor($time * 10)
        } else { 
            currentScore = 0
        }
        score += points
        progress[round-1] = points
        time = readable($time)
        showAnswers()
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
        politicians = politicians.filter(p => p !== politician)
    }

    function showAnswers() {
        showResults = true
        answerTimer = setTimeout(() => {
            answers = []
            showResults = false
            isWrong = false
            next()
        }, 1000)
    }
</script>
<style>
    .buttons {
        margin-bottom: 1rem;
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
    .shake {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }
    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }
    .winner {
        animation: shadow-pulse 1s linear;
    }
    @keyframes shadow-pulse
    {
        0% {
            box-shadow: 0 0 0 0px rgba(110,166,68, 0.2);
        }
        100% {
            box-shadow: 0 0 0 35px rgba(110,166,68, 0);
        }
    }
</style>

<section>
    <Avatar url={politician.ImageUrl} value={1 - $time} />
    <div>
        <Progress items={progress} score={currentScore} round={round-1} />
    </div>
    <div class="buttons {isWrong ? 'shake' : ''}">
        {#each answers as answer, index }
        <button
            on:click={() => onAnswer(answer)} 
            class={showResults ? (answer.wright ? `wright ${!isWrong ? 'winner' : ''}` : 'wrong') : ''}
        >
            {answer.FirstName} {answer.LastName} ({$t('party', answer.Party)})
        </button>
        {/each}
    </div>
</section>
