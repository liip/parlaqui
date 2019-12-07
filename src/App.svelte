<script>
	import Game from './Game.svelte'
	let playing = false
	let ende = false

	function play() {
		playing = true
	}
	function stop() {
		playing = false
		ende = true
	}
	function end() {
		playing = false
		ende = true
	}
</script>

<main>
	<h1>Guess the Politician</h1>
	{#if playing}
		<button on:click={stop}>Stop</button>
		<Game on:end={end} />
	{:else}
		<button on:click={play}>Play</button>
	{/if}
</main>
