const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=b94ebb633aabb0a97fc702cfb94a0448&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, {body}) => {               //only one of error and response will exist at one time.
        if(error)                        //lower level OS issues   (ex: no internet connection)
        {
            callback('Cannot connect to weatherstack API. Please check your internet connection.', undefined)
        }
        else if(body.error){                   //error thrown by API (invalid input)
            callback('Invalid location. Try another location.', undefined)               
        }
        else
        {   
            const parsedData = body    //returns parsed data due to json:true 
            const data = parsedData.current
            const temperature =  data.temperature
            const weather = data.weather_descriptions[0]
            callback(undefined, {
                temperature,
                weather
            })               
        }
    })
}

module.exports = {
      forecast
  }