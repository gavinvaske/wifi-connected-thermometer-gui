const schema = require('schm')
const fs = require('fs')

var temperatureTableFileName = 'db/temperatures.json'

const temperatureSchema = schema({
    temperature: {
        type: Number,
        required: true,
        min: 10,
        max: 50
    },
    timeStamp: {
        type: Date,
        required: true
    }
})
// Get ALL temperatures stored in DB
function getData(){
    fs.readFile(temperatureTableFileName, (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data)
        return jsonData
      })
}

function updateData(data){
    // Validate incoming data
    let parsedRequest = temperatureSchema.parse(data)
    let temperatureModel = await temperatureSchema.validate(parsedRequest)
    // If all is well - add it to DB
    let temperaturesTable = self.getData()
    temperaturesTable['temperatures'].push(temperatureModel)
    fs.writeFile(temperatureTableFileName, JSON.stringify(temperaturesTable, null, 2), function(error){
        if (error) throw error
    })
}