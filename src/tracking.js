
export const languageSet = (language) => {
    dataLayer.push({ event: 'language.set', language })
}

export const gameStart = () => {
    dataLayer.push({ event: 'game.start' })
}

export const gameAbort = () => {
    dataLayer.push({ event: 'game.abort' })
}

export const gameEnd = (score) => {
    dataLayer.push({ event: 'game.end', score })
}

export const gameAnswerClick = ({wright, ID}) => {
    if(ID) {
        dataLayer.push({ event: 'game.answer.click', wright, ID })    
    } else {
        dataLayer.push({ event: 'game.answer.timeout'})    
    }
}

export default {
    languageSet,
    gameStart,
    gameAbort,
    gameEnd,
    gameAnswerClick,
}
