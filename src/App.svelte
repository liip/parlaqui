<script>
	import { tweened } from 'svelte/motion'
	import Game from './Game.svelte'
	let playing = false
	let ende = false
	let lastScore = null

	function play() {
		playing = true
	}
	function stop() {
		playing = false
		ende = true
	}
	function end(e) {
		playing = false
		ende = true
		lastScore = e.detail
	}
</script>
<style>
	main {
		margin-left: auto;
		margin-right: auto;
		padding: 0 1rem;
		width: 340px;
	}
	button {
		margin-top: 1rem;
		width: 100%;
	}
</style>
<main>
	<h1>Guess the Politician</h1>
	{#if playing}		
		<Game on:end={end} />
		<button on:click={stop}>Quit</button>
	{:else}
		<button on:click={play}>Play</button>
		{#if lastScore !== null}
			<h2>Your Score: {lastScore}</h2>
		{/if}	
	{/if}
</main>
