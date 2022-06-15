const apiUrl = 'http://localhost:3000/weather?address='

const weatherForm = document.getElementById('weather-form')
const addressInput = document.getElementById('address-input')
const weatherResultSection = document.getElementById('weather-result')

async function getWeather(address) {
    return await fetch(apiUrl + address)
        .then(async response => {
            return await response.json()
        })
        .catch(error => {
            console.log(`[getWeather] => ${error}`)
            return { error: 'Unable to connect with server. Please try later.' }
        })
}

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    weatherResultSection.innerHTML = 'Loading...'
    const address = addressInput.value
    
    const weatherApiResponse = await getWeather(address)
    const htmlResult = Object.values(weatherApiResponse).reduce((previous, current) => previous + `<p>${current}</p>`, '')
    weatherResultSection.innerHTML= htmlResult;
})