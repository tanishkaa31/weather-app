//console.log("Client side Javascript file has been loaded!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()      // to prevent browser from refreshing everytime we click on Submit
    
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''

    //Fetch JSON data from URL
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {            //data as javascript object
        if(data.error)
        {
            message1.textContent = data.error
        }
        else{
            message1.textContent = 'Location: ' + data.location
            message2.textContent = 'Temperature (in Celsius): ' + data.temperature  
            message3.textContent = 'Weather Description: ' + data['weather description']
        }
    })
})
})