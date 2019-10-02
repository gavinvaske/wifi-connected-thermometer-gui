const schema = require('schm')

const settingsTableName = 'db/settings.json'

const settingsSchema = schema({
    phoneNumber: {
        type: String,
        required: [true, 'User phone number required']
    },
    maxAlertMessage: {
        type: String,
        required: [true, 'maximum alert message must be defined']
    },
    minAlertMessage: {
        type: String,
        required: [true, 'minimum alert message must be defined']
    },
    maxThreshold: {
        type: String,
        required: [true, 'maximum threshold must be defined']
    },
    minThreshold: {
        type: String,
        required: [true, 'minimum threshold must be defined']
    },
    temperatureScale: {
        type: Number,
        required: [true, 'The temperature scale must be defined']
    }
})

// Get ALL settings stored in DB
function getData(){
    fs.readFile(temperatureTableFileName, (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data)
        return jsonData
    })
}

async function updateData(data){
    let parsedRequest = settingsSchema.parse(data)
    // Parse the request for the parameters we are looking for
    let settingsModel = await settingsSchema.validate(parsedRequest)
    // Retrieve the settings from a file
    let settingsTable = self.getData()
    // Write the updated content to a file
    settingsTable['settings'][0] = settingsModel
    // Save the updated content to a file
    fs.writeFile(settingsTableName, JSON.stringify(settingsTable, null, 2), function(error){
        if (error) throw error
    })
}

// (async function validateData(data){
//     let parsedRequest = settingsSchema.parse(data)
//     // Parse the request for the parameters we are looking for
//     let validatedSettings = await settingsSchema.validate(parsedRequest)
//     return validatedSettings
// })().catch( error => { console.error(error)})

exports.settingsSchema = settingsSchema