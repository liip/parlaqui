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
        politician = answers.filter(a => a.wright)[0]
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
        progress[round-1] = answer.wright
        score += answer.wright * currentScore
        time = readable($time)
        answer.wrightID = politician.ID
        tracking.gameAnswerClick(answer)
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
    }

    function showAnswers() {
        showResults = true
        answerTimer = setTimeout(() => {
            answers = []
            showResults = false
            next()
        }, 1000)
    }
    const answerLabel = ({FirstName, LastName, PartyAbbreviation}) => `${FirstName} ${LastName} (${PartyAbbreviation})`
</script>
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
    .wrong {
        background-color: #c02e00;
    }
    .wright {
        background-color: #6EA644;
    }
</style>

<section>
    <Avatar url={politician.ImageUrl} value={1 - $time} />
    <Progress items={progress} />
    <div class="buttons">
        {#each answers as answer, index }
        <button
            on:click={() => onAnswer(answer)} 
            class={showResults ? (answer.wright ? 'wright' : 'wrong') : ''}
        >
            {answerLabel(answer)}
        </button>
        {/each}
    </div>
</section>
