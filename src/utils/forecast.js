const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=83d72390e29381baca6f144f1a667140&query=${lat},${lng}`
        // console.log(url);

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            return callback('Unable to connect weather service!')
        }
        if (body.error) {
            return callback('Unable to find weather!')
        }
        let { weather_descriptions, temperature, feelslike, humidity } = body.current
            // callback(undefined, {
            //     weather: weather_descriptions[0],
            //     temperature,
            //     feelslike,
            // })
        callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature}°C degrees out. It feels like ${feelslike}°C degrees out. The humidity is ${humidity}%`)
    })
}

module.exports = forecast;