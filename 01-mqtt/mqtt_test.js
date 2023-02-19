const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('hands', function (err) {
    if (!err) {
    const seconds = new Date().getSeconds();
      client.publish('hands', 'Hello mqtt:' + seconds.toString())
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
