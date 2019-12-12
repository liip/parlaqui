<script>
	import { tweened } from 'svelte/motion'
	import Game from './Game.svelte'
	import LanguageSwitch from './LanguageSwitch.svelte'
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
	}
</style>

<main>
	<h1>{$t('title')}</h1>
	{#if playing}		
		<Game on:end={end} />
		<button on:click={stop}>{$t('quit')}</button>
	{:else}
		<button on:click={play}>{$t('play')}</button>
		{#if lastScore !== null}
			<h2>{$t('lastScore')} {lastScore}</h2>
		{/if}
		<LanguageSwitch />
	{/if}
</main>
