const fs = require('fs')
const axios = require('axios')
const api = axios.create({
    baseURL: 'https://ws.parlament.ch/odata.svc'
})
const imageUrl = id => `https://www.parlament.ch/sitecollectionimages/profil/portrait-260/${id}.jpg`
async function init() {
    const res = await api.get(`Person?$filter=Language eq 'DE'&$expand=MembersCouncil/MembersParty`)
    // console.log(res.data.d.results[0].MembersCouncil.MembersParty.results[0])

    const councillors = res.data.d.results.map(councillor => {
        return {
            ID: councillor.ID,
            FirstName: councillor.FirstName,
            LastName: councillor.LastName,
            GenderAsString: councillor.GenderAsString,            
            PersonIdCode: councillor.PersonIdCode,
            ImageUrl: councillor.PersonIdCode && imageUrl(councillor.PersonIdCode),
            PartyName: councillor.MembersCouncil && councillor.MembersCouncil.MembersParty.results[0] && councillor.MembersCouncil.MembersParty.results[0].PartyName,
        }
    }).filter(councillor => councillor.ImageUrl)

    fs.writeFileSync('councillors.json', JSON.stringify(councillors, null, 2))
    //console.log(councillors)
}

init()