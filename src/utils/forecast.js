const request = require('request');

const forecast = (latitude, longitude, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=cff95a1aa4be02181bacd7367deb54e9&query=${longitude},${latitude}`;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            cb('unable to connect', undefined)
        }else if (body.error) {
            cb('unable to find geocode coordinates', undefined)
        } else {
            const temperature = body.current.temperature
            const skies = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            cb(undefined, {
                temperature,
                skies,
                humidity
            }    
        )}
    });
}
module.exports = forecast