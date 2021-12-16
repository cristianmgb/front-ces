import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function FaceDetections({ imgToCompare, isMatch, interval }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        // await faceapi.loadTinyFaceDetectorModel("./models");

        startVideo();

        const displaySize = {
          width: videoRef.current.width,
          height: videoRef.current.height,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

          if (detections.length > 0) {
            // fetch image data from urls and convert blob to HTMLImage element
            const img = await faceapi.fetchImage(imgToCompare);
            const faceMatcher = new faceapi.FaceMatcher(detections);

            // detect the face with the highest score in the image and compute it's landmarks and face descriptor
            const singleResult = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();

            if (singleResult) {
              const bestMatch = faceMatcher.findBestMatch(
                singleResult.descriptor
              );
              if (bestMatch.toString().includes("person")) {
                isMatch(true);
              } else {
                isMatch(false);
              }
            }
          }
        }, 100);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  function startVideo() {
    navigator.getUserMedia(
      { video: true },
      (stream) => (videoRef.current.srcObject = stream),
      (err) => console.error(err)
    );
  }

  return (
    <div style={styles.app}>
      <video
        id="video"
        width="720"
        height="560"
        autoPlay
        muted
        ref={videoRef}
      ></video>
      <canvas style={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    position: "absolute",
  },
};

export default FaceDetections;
