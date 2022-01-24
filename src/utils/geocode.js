const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3dhcG5hYW51bXVsYSIsImEiOiJja3lqMXhyZ3Mwb2V0MnVxbzB2N2ZzengyIn0.uiM2QcoQDUm3DmoBIZqbcw&limit=1'
    request({url, json: true}, (error, {body}) => {
    if(error)
    {
        callback('Unable to connect to location services!', undefined)
    } else if(body.features.length === 0) {
        callback('Unable to find Location. Try another search.', undefined)
    } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
    })
} 

module.exports = geocode


// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3dhcG5hYW51bXVsYSIsImEiOiJja3lqMXhyZ3Mwb2V0MnVxbzB2N2ZzengyIn0.uiM2QcoQDUm3DmoBIZqbcw&limit=1'

// request({url: url, json: true}, (error, response) => {
//     if(error)
//     {
//         console.log('Unable to connect to map service!')
//     } else if(response.body.features.length === 0) {
//         console.log('Unable to find Latitude/Longitude')
//     } else {
//         console.log('Latitude ' + response.body.features[0].center[1] + ' Longitude ' + response.body.features[0].center[0])
//     }
// })
