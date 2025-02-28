export async function getVideo(previewCanvas) {
  const avStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  const video = document.createElement("video");
  try {
    // modern browsers
    video.srcObject = avStream;
  } catch (error) {
    // old browsers
    video.src = window.URL.createObjectURL(avStream);
  }

  if (previewCanvas) {
    video.addEventListener("canplay", () => {
      drawPreview(video, previewCanvas);
    });
  }

  await video.play();
  return video;
}

export function drawVideo(video, canvas) {
  const context = canvas.getContext("2d");
  console.log("draw video...");
  console.log("video dimension: ", video.videoWidth, "x", video.videoHeight);
  console.log("canvas dimension: ", canvas.width, "x", canvas.height);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

export function drawPreview(video, canvas) {
  const context = canvas.getContext("2d");
  console.log("draw preview...");
  console.log("video dimension: ", video.videoWidth, "x", video.videoHeight);
  console.log("canvas dimension: ", canvas.width, "x", canvas.height);

  setInterval(() => {
    // using the method with the full parameters list, to make it more clear
    // that video is drawn with the canvas dimension
    context.drawImage(
      video,
      0,
      0,
      video.videoWidth,
      video.videoHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }, 16);
}
