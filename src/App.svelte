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
	function onKeydown(e) {
        switch(e.key) {
            case " ":
                play()
				break
		}
	}
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		};
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
<svelte:window on:keydown={onKeydown} />
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
	<!--
	<svg viewBox="0 0 400 400" width="400" height="400">
		<path fill="orange" stroke="none" fill-rule="evenodd" d={d} />
	</svg>
	-->
</main>
