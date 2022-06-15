const request = require('request')
const { weatherStackToken } = require('../config/config')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackToken}&query=` + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out.`
            })
        }
    })
}

module.exports = forecast