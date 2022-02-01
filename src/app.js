const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Home Page',
        name: 'Santanu',
        pageTitle: 'Home',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather About Page',
        name: 'Santanu',
        pageTitle: 'About',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Help Page',
        name: 'Santanu',
        message: 'This is a demo message',
        pageTitle: 'Help',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide a address'
        })
    }
    const address = req.query.address
    geocode(address, (err, { lat, lng, location } = {}) => {
        if (err) {
            return res.send({ err })
        }
        forecast(lat, lng, (err, result) => {
            if (err) {
                return res.send({ err })
            }
            // console.log(location)
            // console.log(result)
            res.send({ forecast: result, location, address, lat, lng })
        })
    })
})

app.get('/products', (req, res) => {
    // console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santanu',
        message: 'Help article not found',
        pageTitle: '404',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santanu',
        message: 'Page not found',
        pageTitle: '404',
    })
})


app.listen(port, () => {
    console.log(`Server is up on port:${port}`);
})