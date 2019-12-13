const enabled = false

export const languageSet = (language) => {
    enabled && dataLayer.push({ event: 'language.set', language })
}

export const gameStart = () => {
    enabled && dataLayer.push({ event: 'game.start' })
}

export const gameAbort = () => {
    enabled && dataLayer.push({ event: 'game.abort' })
}

export const gameEnd = (score) => {
    enabled && dataLayer.push({ event: 'game.end', score })
}

export const gameAnswerClick = ({wright, ID, wrightID, PartyAbbreviation}) => {
    if(ID) {
        enabled && dataLayer.push({ event: 'game.answer.click', wright, ID, wrightID, PartyAbbreviation })    
    } else {
        enabled && dataLayer.push({ event: 'game.answer.timeout'})    
    }
}

export default {
    languageSet,
    gameStart,
    gameAbort,
    gameEnd,
    gameAnswerClick,
}
