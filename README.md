# MQTT + mediahands = ❤️

We need a local server to run the demos:
```bash
npm install -g live-server
```

# Scripts
## 01-mqtt

We need both the node version and the cli
```bash
npm install mqtt --save
npm install mqtt -g
```

In one terminal run to start listening to the topic `hands`:
```bash
mqtt sub -t 'hands' -h 'test.mosquitto.org' -v
```
In another terminal:
```bash
node 01-mqtt/mqtt_test.js
```
<img width="1239" alt="mqtt" src="https://user-images.githubusercontent.com/3115640/219961094-93421355-6319-4617-993a-b0a910b4d3f4.png">


## 03-mediapipe_demo
Fancy [mediahands demo](https://codepen.io/mediapipe/pen/RwGWYJw)

```bash
live-server 02-mediapipe_demo/dist
```
<img width="1728" alt="fancy" src="https://user-images.githubusercontent.com/3115640/219965402-a68f1c09-b691-4eda-ba53-3c37ce69665e.png">

## 02-mediapipe_barebones
The barebones example from [mediapipe website](https://google.github.io/mediapipe/solutions/hands.html#javascript-solution-api)

```bash
live-server 03-mediapipe_barebones
```
<img width="1728" alt="bare" src="https://user-images.githubusercontent.com/3115640/219965453-2282833b-31a3-414a-b579-71cdfc81045e.png">

## 04-mqtt+p5
```bash
live-server 04-mqtt+p5
```

- [ ]  mqtt doesn't want to connect...

<img width="495" alt="image" src="https://user-images.githubusercontent.com/3115640/219965596-c58d06e2-cd20-4d5c-ab8c-9e8e5bdb7dca.png">

