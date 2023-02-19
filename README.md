# dependencies

Add mqtt to the dependencies (for node)
```bash
npm install mqtt --save
```

Add mqtt globally to access the cli commands.
```bash
npm install mqtt -g
```

Live server to run demos
```bash
npm install -g live-server
live-server mediapipe_demo/dist/
```

# Scripts
## 01-mqtt

In one terminal run to start listening to the topic `hands`:
```bash
mqtt sub -t 'hands' -h 'test.mosquitto.org' -v
```
In another terminal:
```bash
node 01-mqtt/mqtt_test.js
```

## 02-mediapipe_demo
Fancy [mediahands demo](https://codepen.io/mediapipe/pen/RwGWYJw)

```bash
live-server 02-mediapipe_demo/dist
```

## 02-mediapipe_barebones
The barebones example from [mediapipe website](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)

```bash
live-server 03-mediapipe_barebones
```

## 03-united

https://github.com/mqttjs/MQTT.js/issues/1163
