const request = require('request');

const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxtb2dyYW0iLCJhIjoiY2toNGQwems2MDJqMDJ5cGg2NmM3enl0ZCJ9.r26TMqjzYo7avPQMrH9AaA&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            cb('unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            cb('no such place, please try a different query search', undefined)
        }else {
            const features = body.features
            const latitude = features[0].center[1]
            const longitude = features[0].center[0]
            const placeName = features[0].place_name
                cb(undefined, {
                    longitude,
                    latitude,
                    location: placeName
            })
        }
    });
    
}

module.exports = geocode
