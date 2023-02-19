// simple MQTT example for Lapo
// Created by John Cohn 1/21/23 johncohnvt@gmail.com
//
// This script uses MQTT to publish the X value o the cursor to a public broker cursor
// to view published data you can:
// - point your browser  to http://www.hivemq.com/demos/websocket-client/
// - change the Host: to test.mosquitto.org and the Port to 8081
// - click the "Connect".. button
// - then click "add new subscription"
// - then change Topic to "lapo/x". and hit "Subscribe button"
// - cgo back to P5.js window and move the mouse aroudn the black square
// - you should see changing X values listed in the MQTT websocket window
//
//. Cde starts here
// open MQTT server: test.mosquitto.org
var client = mqtt.connect("wss://test.mosquitto.org:8081/mqtts");

// set up connect event (may need to create event to check if connection fails and restart)
function connectEvent() {
  console.log("connecting");
  // subscribe to a topic tree under "lapo/"
  client.subscribe("lapo/x", function (err) {
    if (!err) {
      // if all ok .. publish to a topic with an initial value
      client.publish("lapo/x", "0");
    }
  });
}

// process a received message
function messageEvent(topic, message) {
  // if its on this topic.. print out a special message
  if (topic == "lapo/x") {
    console.log("the x value is " + message.toString());
  }
  // print out a message regardless of topic
  console.log(topic + " - " + message.toString());
}

function setup() {
  // Call mq
  // connect to the  mqtt broker .. note we may need a way to check for error and reopen conenction if necessary
  client.on("connect", connectEvent);
  // register a message handler
  client.on("message", messageEvent);

  noCanvas();

  const videoElement = document.getElementsByClassName("input_video")[0];
  const canvasElement = document.getElementsByClassName("output_canvas")[0];
  const canvasCtx = canvasElement.getContext("2d");

  // this function is defined here to capture canvasCtx and client in a closure.
  function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
        
        // publish the x value of the the first landmark to mqtt
        const pos = landmarks[0].x;
        client.publish("lapo/x", pos.toString());
      }
    }
    canvasCtx.restore();
  }

  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    },
  });
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  hands.onResults(onResults);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
  });
  camera.start();
}

function draw() {}
