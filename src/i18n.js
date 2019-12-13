import { writable, derived } from 'svelte/store'
import tracking from './tracking'

const defaultLanguage = 'de'
export const languages = ['de', 'fr', 'it', 'rm']
export const language = writable(getDefaultLanguage()) 
export const setLanguage = lang => language.set(lang)

language.subscribe(setDefaultLanguage)

function setDefaultLanguage(lang) {
    location.hash = lang
    localStorage.setItem('language', lang)
    tracking.languageSet(lang)
}

function getDefaultLanguage() {
    const urlLanguage = location.hash.substr(1)
    return languages.find(l => l === urlLanguage) || localStorage.getItem('language') || defaultLanguage
}

const dictionaries = {
    de: {
        title: 'Parlaqui',
        description: 'Wer bin ich?',
        play: 'Spielen / jetzt loslegen',
        lastScore: 'Teile dein Ergebnis:',
        score: 'Punkte:',
    },
    fr: {
        title: 'Parlaqui',
        description: 'Qui suis-je ?',
        play: 'Jouer / commencer maintenant',
        lastScore: 'Partagez vos résultats',
        score: 'Points:',
    },
    it: {
        title: 'Parlaqui',
        description: 'chi sono io?',
        play: 'gioca / inizia ora',
        lastScore: 'condividi i tuoi risultati',
        score: 'Punti:',
    },
    rm: {
        title: 'Parlaqui',
        description: 'tgi sun jau?',
        play: 'guigar / cumenzar uss',
        lastScore: 'parta tes resultat',
        score: 'Punkte:',
    },
}

export const t = derived([language], (language) => (key) => { 
    const dictionary = dictionaries[language] || {}
    return dictionary[key] || `#${key}#`
})