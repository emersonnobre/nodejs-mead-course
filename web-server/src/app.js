const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./services/geocode')
const forecast = require('./services/forecast')

const app = express()

const PORT = 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        authorName: 'Emerson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        authorName: 'Emerson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help session',
        authorName: 'Emerson'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help session',
        error: 'Help article not found',
        authorName: 'Emerson'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.status(400).json({
            error: 'You must provide an address.'
        })
    }
    
    geocode(address, (error, data) => {
        if (error) return res.json({ error })

        const { latitude, longitude, location } = data
        forecast(latitude, longitude, (error, data) => {
            if (error) return res.json({ error })

            const { forecast } = data
            res.json({
                forecast,
                location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Weather app',
        error: 'Page not found',
        authorName: 'Emerson'
    })
})

app.listen(PORT, () => {
    console.info(`Server is running on ${PORT}`)
})