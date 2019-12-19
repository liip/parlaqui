const fs = require('fs')
const axios = require('axios')
const api = axios.create({
    baseURL: 'https://ws.parlament.ch/odata.svc'
})
const imageUrl = id => `https://parlaqui.rokka.io/par/-${id}.jpg-.jpg`
async function init() {
    const res = await api.get(`Person?$filter=Language eq 'DE' and MembersCouncil/Active eq true&$expand=MembersCouncil`)
    console.log(res.data.d.results.length)
    
    const councillors = res.data.d.results.map(councillor => {
        return {
            ID: councillor.ID,
            FirstName: councillor.FirstName,
            LastName: councillor.LastName,
            GenderAsString: councillor.GenderAsString,            
            ImageUrl: councillor.PersonIdCode && imageUrl(councillor.PersonIdCode),
            PartyAbbreviation: councillor.MembersCouncil && councillor.MembersCouncil.PartyAbbreviation,
            Party: councillor.MembersCouncil && councillor.MembersCouncil.Party,
        }
    })
    
    fs.writeFileSync('councillors.json', JSON.stringify(councillors, null, 2))

    const councillorParties = []
    councillors.forEach(councillor => {
        if(!councillorParties.includes(councillor.Party)) {
            councillorParties.push(councillor.Party)
        }
    })
    
    const res2 = await api.get(`Party`)
    const parties = res2.data.d.results.map(p => ({ 
        ID: p.ID, 
        Language: capitalize(p.Language.toLowerCase()),
        // PartyName: p.PartyName,
        PartyAbbreviation: p.PartyAbbreviation,
    })).filter(party => councillorParties.includes(party.ID))
    
    fs.writeFileSync('parties.json', JSON.stringify(parties, null, 2))
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

init()