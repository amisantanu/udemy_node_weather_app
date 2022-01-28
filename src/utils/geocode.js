const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FudGFudXBhdWw0MCIsImEiOiJja3liZXhiOWkwZW52Mm5vbG85ZzgwNDhsIn0.orqOR55Q2q5G5EY_UeDZOw&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            return callback('Unable to connect location service!')
        }
        if (!body.features || body.features.length === 0) {
            return callback('Unable to find lat long!')
        }
        let { place_name, center } = body.features[0]
        callback(undefined, {
            location: place_name,
            lat: center[1],
            lng: center[0],
        })
    })
}

module.exports = geocode;