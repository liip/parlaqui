<script>
import { languages, language, setLanguage } from './i18n'
$: currentLanguage = $language
</script>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    a:hover {
        text-decoration: none;
    }
    .lang {
        color: #414141;
        text-align: center;
        text-transform: uppercase;
        margin: 0.5rem;
    }
    .lang:hover, .lang.active {
        text-decoration: underline;
    }
</style>

<nav>
{#each languages as language (language)}
    <a class="lang" class:active={language === currentLanguage} href="javascript:" on:click|preventDefault={() => setLanguage(language)}>{language}</a>
{/each}
</nav>