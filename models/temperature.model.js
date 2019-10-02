const schema = require('schm')
const fs = require('fs')

// Path to the temperature file
var temperatureTableFileName = 'db/temperatures.json'

// Schema used for validation
const temperatureSchema = schema({
    temperature: {
        type: Number,
        required: true,
        min: 10,
        max: 50,
        default: 0,
    },
    timeStamp: {
        type: Date,
        required: true,
        default: null,
    }
})

// Return the time in seconds
function getTime(){
    return Date.now() / 1000 | 0
}

// Get ALL temperatures stored in DB
function getData(){
    fs.readFile('db/temperatures.json', (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data)
        return jsonData
      })
}

//
// TODO: Fix the await statement on this
//

// // Update datafile with a new item
// function updateData(data){
//     // Validate incoming data
//     let parsedRequest = temperatureSchema.parse(data)
//     let temperatureModel = await temperatureSchema.validate(parsedRequest)
//     // If all is well - add it to DB
//     let temperaturesTable = self.getData()
//     temperaturesTable['temperatures'].push(temperatureModel)
//     fs.writeFile(temperatureTableFileName, JSON.stringify(temperaturesTable, null, 2), function(error){
//         if (error) throw error
//     })
// }

exports.getData = getData