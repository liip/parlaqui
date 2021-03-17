const councillors = require('./councillors.json')
const axios = require('axios')

// call all rokka images to prevent long loading lags while playing.
// only run once if images in rokka are deleted, or import contains new data.
async function main() {
    const all = await Promise.all(councillors.map(c => axios.get(c.ImageUrl)))
    console.log('done')
}
main()
