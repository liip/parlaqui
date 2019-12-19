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

	let score = tweened(0, {duration: 1000})
	let playing = false
	let ende = false
	let lastScore = null
	let councils = [{
		label: 'council.all',
		councils: [1,2,99],
	}, {
		label: 'council.1',
		councils: [1],
	},
	{
		label: 'council.2',
		councils: [2],
	}]
	let selectedCouncil = councils[0]

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
		score.set(lastScore)
		tracking.gameEnd(lastScore)		
	}
	function selectCouncil(council) {
		selectedCouncil = council
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
	.council a {
		margin: 0.5rem;
	}
	.council a.selected {
		text-decoration: underline;
	}
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
			<Game on:end={end} councils={selectedCouncil.councils} />			
		{:else}
			<PlayButton on:click={play}>{$t('play')}</PlayButton>
			<div class="council">
			{#each councils as council}
			<a href="javascript:" on:click={() => selectCouncil(council)} class:selected={council === selectedCouncil}>{$t(council.label)}</a>
			{/each}
			</div>
			{#if lastScore !== null}
				<h2>{$t('lastScore')} {Math.floor($score)}</h2>
			{/if}
		{/if}
		</section>
	</div>
	<footer>
		<LanguageSwitch />
		<a aria-label="liip homepage" href="https://liip.ch"><LiipLogo /></a>
	</footer>
</main>
