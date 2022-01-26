const request = require('request')

const forecast =(latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e360a51b4eccfb5c1c893689903025c&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
    
        } else if(body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degress out. The Humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast





// const url = 'http://api.weatherstack.com/current?access_key=5e360a51b4eccfb5c1c893689903025c&query=37.8267,-122.4233&units=f'

// request({url: url, json: true}, (error, response) => {
//     if(error)
//     {
//         console.log('Unable to connect to weather service!')

//     } else if(response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degress out.')
//     }
    
//              //console.log(response.body.current)

//              // without json
//              /*const data = JSON.parse(response.body)
//               console.log(data.current)*/
// })