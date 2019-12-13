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
        title: 'Rate den Politiker',
        play: 'Spielen',
        quit: 'Beenden',
        lastScore: 'Erreichte Punkte:',
        score: 'Punkte:',
    },
    fr: {
        title: 'Évaluez le politicien',
        play: 'Jouer',
        quit: 'Sortie',
        lastScore: 'Points gagnés:',
        score: 'Points:',
    },
    it: {
        title: 'Valuta il politico',
        play: 'Gioco',
        quit: 'Uscita',
        lastScore: 'Punti guadagnati:',
        score: 'Punti:',
    },
    gr: {
        title: 'Rate den Politiker',
        play: 'Spielen',
        quit: 'Beenden',
        lastScore: 'Erreichte Punkte:',
        score: 'Punkte:',
    },
}

export const t = derived([language], (language) => (key) => { 
    const dictionary = dictionaries[language] || {}
    return dictionary[key] || `#${key}#`
})