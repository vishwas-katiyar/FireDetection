import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import {
  Button,
  Card,
  CardBody,
  Select,
  Option,
  Typography,
  Progress,
  Slider,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import { detect, detectVideo } from "./utils/detect";
import "./style/App.css";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [selectedModel, setSelectedModel] = useState("fire_n");
  const [iouThreshold, setIouThreshold] = useState(0.5);
  const [scoreThreshold, setScoreThreshold] = useState(0.5);

  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      setLoading({ loading: true, progress: 0 });

      const yolov8 = await tf.loadGraphModel(
        `${window.location.href}/${selectedModel}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions });
          },
        }
      );

      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]);
    };

    tf.ready().then(loadModel);
  }, [selectedModel]);

  const handleModelChange = (event) => {
    closeDrawer();
    setSelectedModel(event);
  };

  return (
    <div className="App bg-gray-200 text-gray-900 min-h-screen py-8">
      {loading.loading && (
        <Loader>
          <Progress value={loading.progress * 100} size="lg" color="blue" />
          <Typography variant="lead" className="mt-2">
            Loading model... {(loading.progress * 100).toFixed(2)}%
          </Typography>
        </Loader>
      )}
      <div className="">
        <div>
          <Typography variant="h2" className="text-gray-900">
            📷 YOLOv8 Live Detection App
          </Typography>
          <Typography className="mt-4 text-gray-700">
            YOLOv8 live detection application on browser powered by{" "}
            <code>tensorflow.js</code>
          </Typography>
          <Typography className="mt-2 text-gray-700">
            Serving: <code className="code">{selectedModel}</code>
          </Typography>
        </div>
        <React.Fragment>
          <IconButton
            ripple={false}
            className="fixed bottom-4 shadow-2xl right-4 rounded-full w-[6rem] h-[6rem] max-w-[4rem] max-h-[4rem] bg-white border border-gray-100"
            onClick={openDrawer}
          >
            <img src="settings.gif" className="max-w-[3rem]" />
          </IconButton>

          <Drawer
            open={open}
            onClose={closeDrawer}
            className="p-4"
            placement="right"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Material Tailwind
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="mt-4">
              <Select
                label="Select Model"
                value={selectedModel}
                onChange={handleModelChange}
                color="blue"
                className="bg-gray-100 text-gray-900"
              >
                <Option value="fire_n">Fire N (Nano)</Option>
                <Option value="fire_s">Fire S (Small)</Option>
                <Option value="fire_m">Fire M (Medium)</Option>
                <Option value="fire_l">Fire L (Large)</Option>
              </Select>
            </div>
            <div className="mt-4">
              <Typography className="mb-2 text-gray-700">
                IOU Threshold: {iouThreshold}
              </Typography>
              <Slider
                value={iouThreshold}
                min={0}
                size="md"
                max={1}
                step={0.001}
                onChange={(value) => {
                  setIouThreshold(value.target.value);
                  localStorage.setItem("iouThreshold", value.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <Typography className="mb-2 text-gray-700">
                Score Threshold: {scoreThreshold}
              </Typography>
              <Slider
                value={scoreThreshold}
                min={0}
                max={1}
                step={0.001}
                onChange={(value) => {
                  setScoreThreshold(value.target.value);
                  localStorage.setItem("scoreThreshold", value.target.value);
                }}
              />
            </div>
          </Drawer>
        </React.Fragment>
      </div>
      <div className="content flex flex-col items-center">
        <img
          src="#"
          ref={imageRef}
          className="mt-4 rounded-lg shadow-md"
          onLoad={() =>
            detect(
              imageRef.current,
              model,
              canvasRef.current,
              iouThreshold,
              scoreThreshold
            )
          }
        />
        <video
          autoPlay
          muted
          ref={cameraRef}
          className="mt-4 rounded-lg shadow-md"
          onPlay={() =>
            detectVideo(cameraRef.current, model, canvasRef.current)
          }
        />
        <video
          autoPlay
          muted
          ref={videoRef}
          className="mt-4 rounded-lg shadow-md"
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
          className="rounded-lg shadow-md"
        />
      </div>
        <ButtonHandler
          imageRef={imageRef}
          cameraRef={cameraRef}
          videoRef={videoRef}
        />
    </div>
  );
};

export default App;
