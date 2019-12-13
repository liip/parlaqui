<script>
	import { tweened } from 'svelte/motion'
	import Game from './Game.svelte'
	import LanguageSwitch from './LanguageSwitch.svelte'
	import Icon from './Icon.svelte'
	import { t } from './i18n'

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
    	color: #414141;;
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
	<h1>{$t('title')} {#if playing}<a class="close" on:click={stop} href="javascript:"><Icon name="close" size={100} /></a>{/if}</h1>
	
	{#if playing}		
		<Game on:end={end} />
	{:else}
		<button class="play green" on:click={play}>{$t('play')}</button>
		{#if lastScore !== null}
			<h2>{$t('lastScore')} {lastScore}</h2>
		{/if}
	{/if}
	<footer>
		<LanguageSwitch />
		<a href="https://liip.ch"><Icon size={300} /></a>
	</footer>	
</main>
