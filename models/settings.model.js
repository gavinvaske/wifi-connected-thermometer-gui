const schema = require('schm')

const settingsTableName = 'db/settings.json'

const settingsSchema = schema({
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
        required: [true, 'User phone number required']
    },
    alertMessages: {
        type: [String],
        required: [true, 'alert messages must be defined']
    },
    thresholds: {
        type: [String],
        required: [true, 'thresholds must be defined']
    },
})

// Get ALL settings stored in DB
function getData(){
    fs.readFile(temperatureTableFileName, (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data)
        return jsonData
    })
}

function updateData(data){
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