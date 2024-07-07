import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import {
  Select,
  Option,
  Typography,
  Progress,
  Slider,
  Drawer,
  IconButton,
  Checkbox,
  Card,
} from "@material-tailwind/react";
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import { detect, detectVideo } from "./utils/detect";
import "./style/App.css";
import ConfigSummary from "./components/ConfigSummary";
import DemoPage from "./components/demo";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [flag, setFlag] = useState(localStorage.getItem("demo"));
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("fire_n");

  const [iouThreshold, setIouThreshold] = useState(() => {
    const storedValue = localStorage.getItem("iouThreshold");
    const initialValue = parseInt(storedValue);
    return isNaN(initialValue) ? 50 : initialValue;
  });

  const [scoreThreshold, setScoreThreshold] = useState(() => {
    const storedValue = localStorage.getItem("scoreThreshold");
    const initialValue = parseInt(storedValue);
    return isNaN(initialValue) ? 50 : initialValue;
  });

  const [smokeAlert, setSmokeAlert] = useState(true);
  const [fireAlert, setFireAlert] = useState(true);

  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load saved values from localStorage
    const savedSmokeAlert = localStorage.getItem("smokeAlert") === "true";
    const savedFireAlert = localStorage.getItem("fireAlert") === "true";

    setSmokeAlert(savedSmokeAlert);
    setFireAlert(savedFireAlert);

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

  useEffect(() => {
    localStorage.setItem("smokeAlert", smokeAlert.toString());
    localStorage.setItem("fireAlert", fireAlert.toString());
    localStorage.setItem("scoreThreshold", scoreThreshold.toString());
    localStorage.setItem("iouThreshold", iouThreshold.toString());
  }, [smokeAlert, fireAlert,scoreThreshold,iouThreshold]);

  const handleModelChange = (event) => {
    closeDrawer();
    setSelectedModel(event);
  };

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <div className="App bg-gray-200 text-gray-900 min-h-screen min-w-full">
      {loading.loading && (
        <Loader>
          <Progress value={loading.progress * 100} size="lg" color="gray" />
          <Typography variant="lead" className="mt-2">
            Loading model... {(loading.progress * 100).toFixed(2)}%
          </Typography>
        </Loader>
      )}
      <div className="pt-[6rem] w-[95%]">
        <ConfigSummary
          iouThreshold={iouThreshold}
          selectedModel={selectedModel}
          scoreThreshold={scoreThreshold}
          fireAlert={fireAlert}
          smokeAlert={smokeAlert}
          setFireAlert={setFireAlert}
          setSmokeAlert={setSmokeAlert}
          openDrawer={openDrawer}
        />

        <React.Fragment>
          <IconButton
            ripple={false}
            className="fixed bottom-4 shadow-2xl right-4 rounded-full w-[6rem] h-[6rem] max-w-[4rem] max-h-[4rem] bg-white border border-gray-100"
            onClick={openDrawer}
          >
            <img src="settings.gif" className="max-w-[3rem]" alt="Settings" />
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
                IOU Threshold: {iouThreshold} %
              </Typography>
              <Slider
                defaultValue={iouThreshold}
                step={0.001}
                onChange={(value) => {
                  setIouThreshold(value.target.value);
                  localStorage.setItem("iouThreshold", value.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <Typography className="mb-2 text-gray-700">
                Score Threshold: {scoreThreshold} %
              </Typography>
              <Slider
                defaultValue={scoreThreshold}
                step={0.001}
                onChange={(value) => {
                  setScoreThreshold(value.target.value);
                  localStorage.setItem("scoreThreshold", value.target.value);
                }}
              />
            </div>
            <div className="flex items-center mt-4">
              <Checkbox
                checked={smokeAlert}
                onChange={(e) => setSmokeAlert(e.target.checked)}
                color="gray"
              />
              <Typography className="text-gray-700">Smoke Alert</Typography>
            </div>
            <div className="flex items-center mt-2">
              <Checkbox
                checked={fireAlert}
                onChange={(e) => setFireAlert(e.target.checked)}
                color="gray"
              />
              <Typography className="text-gray-700">Fire Alert</Typography>
            </div>
          </Drawer>
        </React.Fragment>
        {!flag && <DemoPage />}
      </div>
      <div className="mt-4">
        <div className="content flex flex-col items-center">
          <img
            src="#"
            ref={imageRef}
            className=" rounded-lg shadow-md"
            onLoad={() =>
              detect(
                imageRef.current,
                model,
                canvasRef.current,
                iouThreshold,
                scoreThreshold
              )
            }
            alt="Image for detection"
          />
          <video
            autoPlay
            muted
            ref={cameraRef}
            className=" rounded-lg shadow-md"
            onPlay={() =>
              detectVideo(cameraRef.current, model, canvasRef.current)
            }
            alt="Camera feed for detection"
          />
          <video
            autoPlay
            muted
            ref={videoRef}
            className=" rounded-lg shadow-md"
            onPlay={() =>
              detectVideo(videoRef.current, model, canvasRef.current)
            }
            alt="Video feed for detection"
          />
          {flag && (
            <canvas
              width={model.inputShape[1]}
              height={model.inputShape[2]}
              ref={canvasRef}
              className="rounded-lg shadow-md h-[18rem]"
              alt="Canvas for output"
            />
          )}
        </div>
      </div>
      <ButtonHandler
        imageRef={imageRef}
        cameraRef={cameraRef}
        videoRef={videoRef}
        setFlag={setFlag}
      />
    </div>
  );
};

export default App;
