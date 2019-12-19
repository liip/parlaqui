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
		max-width: 400px;
		padding: 1rem;
	}
	footer {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	a {
    	color: #414141;
	}
	section {
		text-align: center;
		margin-bottom: 1rem;
	}
	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	@media (max-width: 320px) {
		main {
			padding: 0.5rem;	
		}
		section {
			margin-bottom: 0.5rem;
		}
		header {
			margin-bottom: 0;
		}
  	}
	/*
	.background:before, .background:after {
		z-index: -1;
		content: "";
		position: absolute;
		top: -20vw;
		left: -20vw;
		width: 100vw;
		height: 100vw;
		background: linear-gradient(rgba(176, 176, 150, 0.2), hsla(0, 0%, 100%, 0));
		border-radius: 50%;
	}
	.background:after {
		transform: rotate(100deg);
		top: 20vw;
		left: 20vw;
	}*/
</style>
<main>
	<div>
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
	</div>
	<footer>
		<LanguageSwitch />
		<a href="https://liip.ch"><LiipLogo /></a>
	</footer>
</main>
