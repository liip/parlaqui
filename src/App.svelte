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
	/*
	let tw = tweened(0, { duration: 5000 })
	tw.set(359)

	$: opts = {
		cx: 200,
		cy: 200,
		radius: 200,
		start_angle: 0,
		end_angle: $tw,
	};

	$: start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle)
	$: end2 = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle)
	$: largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1"

	$: d = [
		"M", start.x, start.y,
		"A", opts.radius, opts.radius, 0, largeArcFlag, 0, end2.x, end2.y,
		"L", opts.cx, opts.cy,
		"Z"
	].join(" ");
	*/
</script>
<style>
	main {
		margin-left: auto;
		margin-right: auto;
		padding: 0 1rem;
		width: 340px;
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
