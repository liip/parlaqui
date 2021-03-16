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
    .lang {
        color: #414141;
        text-align: center;
        text-transform: uppercase;
        margin: 0.5rem;
    }
    .lang:hover, .lang.active {
        text-decoration: underline;
    }
    button {
        margin: 0.5rem 0;
        padding: 0;
        background: none;
        border: none;
    }
    button:hover {
        text-decoration: none;
    }
</style>

<nav>
{#each languages as language (language)}
    <button class="lang" class:active={language === currentLanguage} on:click={() => setLanguage(language)}>{language}</button>
{/each}
</nav>