const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Swapna Reddy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Swapna Reddy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text.',
        title: 'Help',
        name: 'Swapna Reddy'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must enter address to search'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})    
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Swapna Reddy',
        errormessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Swapna Reddy',
        errormessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})