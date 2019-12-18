<script>
    import { fade } from 'svelte/transition'
    import { t } from './i18n'
</script>
<style>
    button {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid white;
        background-color: white;
    }
    button:hover {
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.15);
        border-color: rgba(197, 191, 191, 0.1);
    }
    svg path {
        stroke: #2c3e50;
    }
</style>
<button transition:fade={{duration: 200}} on:click title={$t('quit')}>
    <svg viewBox="0 0 10 10">
        <path d="
            M1,1
            L9,9
            M9,1
            L1,9
            " 
    />
    </svg>
</button>
