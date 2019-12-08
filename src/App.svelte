<script>
	import Game from './Game.svelte'
	let playing = false
	let ende = false
	let lastScore

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

<main>
	<h1>Guess the Politician</h1>
	{#if playing}
		<button on:click={stop}>Stop</button>
		<Game on:end={end} />
	{:else}
		<button on:click={play}>Play</button>
		{#if lastScore !== undefined}
			<h2>Your Score: {lastScore}</h2>
		{/if}
	{/if}
</main>
