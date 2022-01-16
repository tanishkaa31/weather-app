const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecasting_module = require('./utils/forecast.js')
const geocoding_module = require('./utils/geocoding.js')

// console.log(__dirname, __filename)
// console.log(path.join(__dirname, '../public'))

const app = express()       //express = function, not object

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')      //if hbs files not in '../views' directory
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')   //dynamic templating; by default hbs files should be in '../views' directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup webpages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tanishka Gaur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tanishka Gaur'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tanishka Gaur',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address)
   {
       return res.send({
           error: "You must provide an address."
       })
   }

   geocoding_module.geocode(req.query.address, ({longitude, latitude, location} = {}, error) => {
       if(error)
       {
           return res.send({error})
       }

       forecasting_module.forecast(longitude, latitude, (error, {temperature, weather} = {}) => {
           if(error)
           {
               return res.send({error})
           }

           res.send({
               location,
               temperature: temperature + " Degrees",
               'weather description': weather
           })
       })
   })
})

//404 Page [* -> wildcard]
app.get('/help/*', (req, res) => {
    res.render('error',{
        error: "Help article not found",
        title: '404 Error',
        name: 'Tanishka Gaur'
    })
})

app.get('*', (req, res)=> { 
    res.render('error', {
        error: "Page not found",
        title: '404 Error',
        name: 'Tanishka Gaur'
    })
})

//Setup port
app.listen(3200, () => {
    console.log("Server up and running on port 3200.")
})


// app.get('', (req, res) => {
//     res.send('Hello express!')
// })               //not necessary since index.html = page by default, after app.use()

// app.get('/help', (req, res) => {
   
//     res.send('Welcome to the Help page!')
// })

// app.get('/about', (req, res)=>{
//     res.send("<h1>About page</h1>")
// })
