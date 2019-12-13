<script>
	import { tweened } from 'svelte/motion'
	import Game from './Game.svelte'
	import LanguageSwitch from './LanguageSwitch.svelte'
	import Icon from './Icon.svelte'
	import Logo from './Logo.svelte'
	import { t } from './i18n'
	import tracking from './tracking'
	import Progress from './Progress.svelte'

	let playing = false
	let ende = false
	let lastScore = null

	function play() {
		playing = true
		tracking.gameStart()
	}
	function stop() {
		playing = false
		ende = true
		tracking.gameAbort()
	}
	function end(e) {
		playing = false
		ende = true
		lastScore = e.detail
		tracking.gameEnd(lastScore)		
	}
</script>
<style>
	main {
		margin-left: auto;
		margin-right: auto;
		padding: 0 1rem;
		max-width: 400px;
	}
	button {
		margin-top: 1rem;
		width: 100%;
		cursor: pointer;
	}
	.play {
		animation: shadow-pulse 1s infinite;
		color: white;
	}
	@keyframes shadow-pulse
    {
        0% {
            box-shadow: 0 0 0 0px rgba(110,166,68, 0.2);
        }
        100% {
            box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
        }
    }
	.green {
		background: #6EA644;
	}
	footer {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
	}
	a {
    	color: #414141;
	}
	.close {
		float: right;
		margin: 0;
		padding: 0;
	}
	.close:hover {
		animation: shadow-pulse 1s infinite;
	}
</style>
<main>
	{#if playing}		
		<h1>{$t('description')} <a class="close" on:click={stop} href="javascript:"><Icon name="close" size={100} /></a></h1>
		<Game on:end={end} />
	{:else}
		<h1>{$t('title')}</h1>
		<button class="play green" on:click={play}>{$t('play')}</button>
		{#if lastScore !== null}
			<h2>{$t('lastScore')} {lastScore}</h2>
		{/if}
		<footer>
			<LanguageSwitch />
			<a href="https://liip.ch"><Logo /></a>
		</footer>	
	{/if}
</main>
