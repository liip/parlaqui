<script>
	import { tweened } from 'svelte/motion'
	import Game from './Game.svelte'
	import LanguageSwitch from './LanguageSwitch.svelte'
	import Icon from './Icon.svelte'
	import LiipLogo from './LiipLogo.svelte'
	import Logo from './Logo.svelte'
	import { t } from './i18n'
	import tracking from './tracking'
	import Progress from './Progress.svelte'
	import PlayButton from './PlayButton.svelte'
	import CloseButton from './CloseButton.svelte'
	import { fade, fly } from 'svelte/transition'

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
	footer {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
	}
	a {
    	color: #414141;
	}
	.background {
		height: 100%;
	}
	section {
		text-align: center;
	}
	header {
		display: flex;
		justify-content: space-between;
	}
</style>
	<main>
		<header class={playing && `playing`}>
			<Logo />
			{#if playing}
			<CloseButton on:click={stop} />	
			{/if}
		</header>
		<section>
		{#if playing}			
			<Game on:end={end} />			
		{:else}
			<PlayButton on:click={play}>{$t('play')}</PlayButton>
			{#if lastScore !== null}
				<h2>{$t('lastScore')} {lastScore}</h2>
			{/if}
		{/if}
		</section>
		{#if !playing}
		<footer>
			<LanguageSwitch />
			<a href="https://liip.ch"><LiipLogo /></a>
		</footer>
		{/if}
	</main>
