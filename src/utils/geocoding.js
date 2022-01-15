const request = require('postman-request')

const geocode = (address, callback) => {
    
    const map_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGFuaXNoa2FhYWFhIiwiYSI6ImNreTJ2dDRydjBreWwycm55ZmowY3o0Nm0ifQ.Hr8yGW5euRnCizoUWRxlSQ&limit=1"      //encodeURIcomponent to encode the address if it contains a special character

    request({ url: map_url, json: true}, (error, {body})=>{
        if(error)
        {
            callback(undefined, "Unable to connect to mapbox API.")
        }
        else{
                try{
                const data = {
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0],
                   location: body.features[0].place_name
                }
                
                callback(data, undefined)        
                }
                catch(e){
                    callback(undefined, "Invalid address. Try another location.")
                }
        }                   //request is asynchronous
})
}

module.exports = {
    geocode
}

