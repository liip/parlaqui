import { writable, derived } from 'svelte/store'

const defaultLanguage = 'de'
export const languages = ['de', 'fr', 'it', 'gr']
export const language = writable(getDefaultLanguage()) 
export const setLanguage = lang => language.set(lang)

language.subscribe(setDefaultLanguage)

function setDefaultLanguage(lang) {
    const url = `/${lang}`
    if(location.pathname !== url) {
        history.pushState(null, null, url)
    }
    localStorage.setItem('language', lang)
}

function getDefaultLanguage() {
    const urlLanguage = location.pathname.substr(1)
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