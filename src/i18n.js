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
        party: byId('DE'),
        quit: 'Beenden',
        'council.all': 'Alle',
        'council.1': 'Nationalrat',
        'council.2': 'Ständerat',
    },
    fr: {
        title: 'Parlaqui',
        description: 'Qui suis-je ?',
        play: 'Jouer / commencer maintenant',
        lastScore: 'Ton score:',
        score: 'Points:',
        party: byId('FR'),
        quit: 'quitter',
        'council.all': 'Tous',
        'council.1': 'Conseil national',
        'council.2': 'Conseil des Etats',
    },
    it: {
        title: 'Parlaqui',
        description: 'chi sono io?',
        play: 'gioca / inizia ora',
        lastScore: 'il tuo punteggio:',
        score: 'Punti:',
        party: byId('IT'),
        quit: 'esci',
        'council.all': 'Tutti',
        'council.1': 'Consiglio nazionale',
        'council.2': 'Consiglio degli Stati',
    },
    rm: {
        title: 'Parlaqui',
        description: 'tgi sun jau?',
        play: 'guigar / cumenzar uss',
        lastScore: 'tes resultat:',
        score: 'Punkte:',
        party: byId('RM'),
        quit: 'finir',
        'council.all': 'Tuot',
        'council.1': 'Cussegl naziunal',
        'council.2': 'Cussegl dals chantuns',
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