const mqtt = require('mqtt')
const client  = mqtt.connect('wss://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('hands', function (err) {
    if (!err) {
      client.publish('hands', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
