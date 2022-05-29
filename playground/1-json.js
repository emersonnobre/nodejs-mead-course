const fs = require('fs')

const standartData = {
    name: 'Carolina',
    age: 32
}

const standartDataJSON = JSON.stringify(standartData)
fs.writeFileSync('1-json.json', standartDataJSON)

setTimeout(() => {
    const dataBuffer = fs.readFileSync('1-json.json')
    const dataJSON = dataBuffer.toString()
    const data = JSON.parse(dataJSON)
    data.name = 'Sabrina'
    data.age = 19

    const newDataJSON = JSON.stringify(data)

    fs.writeFileSync('1-json.json', newDataJSON)
}, 3000)
