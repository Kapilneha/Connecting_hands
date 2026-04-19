const hands = new Hands({ locateFile: (file) =>
  `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });

hands.setOptions({ maxNumHands: 2, modelComplexity: 1,
  minDetectionConfidence: 0.7, minTrackingConfidence: 0.5 });


hands.onResults((results) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(results.image, 0, 0);

  for (const landmarks of results.multiHandLandmarks) {
    // Draw connectors with color
    drawConnectors(ctx, landmarks, HAND_CONNECTIONS,
      { color: '#00FF88', lineWidth: 3 });
    drawLandmarks(ctx, landmarks, { color: '#FF0000', radius: 4 });
  }
});


const camera = new Camera(videoElement, {
  onFrame: async () => { await hands.send({ image: videoElement }); },
  width: 1280, height: 720
});
camera.start();


const color = `hsl(${(Date.now()/10 + index * 20) % 360}, 100%, 65%)`;