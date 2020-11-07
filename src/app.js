const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars
app.set('views', viewPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);

//define static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Almog Ram'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: "almog ram"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help me',
        message: 'help me please, im getting eaten by a bear',
        name: 'almog ram'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'help article not found',
        name: 'almog ram'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'welcome to the page that hasnt found your route - the 404 page',
        name: 'almog ram'
    })
})


app.listen(port, () => {
    console.log(`server is up and running with express on port ${port}`)
})