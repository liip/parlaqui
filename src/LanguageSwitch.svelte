<script>
import { languages, language, setLanguage } from './i18n'
$: currentLanguage = $language
</script>

<style>
    nav {
        display: flex;
        justify-content: space-between;
    }
    a:hover {
        text-decoration: none;
    }
    .lang {
        color: #333;
        text-align: center;
        text-transform: uppercase;
        border: 1px solid #ccc;
        background-color: #f4f4f4;
        margin: 2rem 0.3rem;
        width: 2rem;
        border-radius: 2px;
    }
    .lang:hover, .lang.active {
        background-color: #6EA644;
    }
</style>

<nav>
{#each languages as language (language)}
    <a class="lang" class:active={language === currentLanguage} href={`/${language}`} on:click|preventDefault={() => setLanguage(language)}>{language}</a>
{/each}
</nav>