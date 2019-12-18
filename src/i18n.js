import { writable, derived } from 'svelte/store'
import tracking from './tracking'
import parties from '../parties.json'

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

const byId = lang => id => {
    const p = parties.find(p => p.ID == id && p.Language === lang)
    return p && p.PartyAbbreviation
}

const dictionaries = {
    de: {
        title: 'Parlaqui',
        description: 'Wer bin ich?',
        play: 'Spielen / jetzt loslegen',
        lastScore: 'Dein Ergebnis:',
        score: 'Punkte:',
        party: byId('De'),
        quit: 'Beenden',
    },
    fr: {
        title: 'Parlaqui',
        description: 'Qui suis-je ?',
        play: 'Jouer / commencer maintenant',
        lastScore: 'Ton score:',
        score: 'Points:',
        party: byId('Fr'),
        quit: 'quitter',
    },
    it: {
        title: 'Parlaqui',
        description: 'chi sono io?',
        play: 'gioca / inizia ora',
        lastScore: 'il tuo punteggio:',
        score: 'Punti:',
        party: byId('It'),
        quit: 'esci',
    },
    rm: {
        title: 'Parlaqui',
        description: 'tgi sun jau?',
        play: 'guigar / cumenzar uss',
        lastScore: 'tes resultat:',
        score: 'Punkte:',
        party: byId('Rm'),
        quit: 'finir',
    },
}

export const t = derived([language], (language) => (key, args) => { 
    const dictionary = dictionaries[language] || {}
    const value = dictionary[key]
    if(value) {
        return typeof(value) === 'function' ? value(args) : value
    }
    return `#${key}#`
})