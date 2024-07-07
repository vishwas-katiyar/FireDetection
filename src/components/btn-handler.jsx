import { useState, useRef, useEffect } from "react";
import { Webcam } from "../utils/webcam";
import { Button } from "@material-tailwind/react";

const ButtonHandler = ({ imageRef, cameraRef, videoRef, setFlag }) => {
  const [streaming, setStreaming] = useState(null); // streaming state
  const inputImageRef = useRef(null); // video input reference
  const inputVideoRef = useRef(null); // video input reference
  const webcam = new Webcam(); // webcam handler

  useEffect(() => {
    setFlag(streaming);
  }, [streaming]);
  // closing image
  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
    localStorage.setItem("demo", "true");
  };

  // closing video streaming
  const closeVideo = () => {
    const url = videoRef.current.src;
    videoRef.current.src = ""; // restore video source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputVideoRef.current.value = ""; // reset input video
    videoRef.current.style.display = "none"; // hide video
    localStorage.setItem("demo", "true");
  };

  return (
    <div className="w-[95%] flex justify-center">
      <div className="btn-container flex gap-3">
        {/* Image Handler */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const url = URL.createObjectURL(e.target.files[0]); // create blob url
            imageRef.current.src = url; // set video source
            imageRef.current.style.display = "block"; // show video
            setStreaming("image"); // set streaming to video
            localStorage.setItem("demo", "false");
          }}
          ref={inputImageRef}
        />
        <Button
          onClick={() => {
            // if not streaming
            if (streaming === null) inputImageRef.current.click();
            // closing image streaming
            else if (streaming === "image") closeImage();
            else
              alert(
                `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
              ); // if streaming video or webcam
          }}
        >
          {streaming === "image" ? "Close" : "Open"} Image
        </Button>

        {/* Video Handler */}
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (streaming === "image") closeImage(); // closing image streaming
            const url = URL.createObjectURL(e.target.files[0]); // create blob url
            videoRef.current.src = url; // set video source
            videoRef.current.addEventListener("ended", () => closeVideo()); // add ended video listener
            videoRef.current.style.display = "block"; // show video
            setStreaming("video"); // set streaming to video
            localStorage.setItem("demo", "false");
          }}
          ref={inputVideoRef}
        />
        <Button
          onClick={() => {
            // if not streaming
            if (streaming === null || streaming === "image")
              inputVideoRef.current.click();
            // closing video streaming
            else if (streaming === "video") closeVideo();
            else
              alert(
                `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
              ); // if streaming webcam
          }}
        >
          {streaming === "video" ? "Close" : "Open"} Video
        </Button>

        {/* Webcam Handler */}
        <Button
          color="gray"
          onClick={() => {
            // if not streaming
            if (streaming === null || streaming === "image") {
              // closing image streaming
              if (streaming === "image") closeImage();
              webcam.open(cameraRef.current); // open webcam
              cameraRef.current.style.display = "block"; // show camera
              setStreaming("camera"); // set streaming to camera
              localStorage.setItem("demo", "false");
            }
            // closing video streaming
            else if (streaming === "camera") {
              webcam.close(cameraRef.current);
              cameraRef.current.style.display = "none";
              setStreaming(null);
              localStorage.setItem("demo", "true");
            } else
              alert(
                `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
              ); // if streaming video
          }}
        >
          {streaming === "camera" ? "Close" : "Open"} Webcam
        </Button>
      </div>
    </div>
  );
};

export default ButtonHandler;
