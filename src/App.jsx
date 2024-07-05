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
    setSelectedModel(event);
  };

  return (
    <div className="App bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center justify-center">
      {loading.loading && (
        <Loader>
          <Progress value={loading.progress * 100} size="lg" color="blue" />
          <Typography variant="lead" className="mt-2">
            Loading model... {(loading.progress * 100).toFixed(2)}%
          </Typography>
        </Loader>
      )}
      <Card className="max-w-4xl w-full mx-6 mt-6 bg-white shadow-lg rounded-lg">
        <CardBody>
          <Typography variant="h2" className="text-gray-900">
            📷 YOLOv8 Live Detection App
          </Typography>
          <Typography className="mt-4 text-gray-700">
            YOLOv8 live detection application on browser powered by <code>tensorflow.js</code>
          </Typography>
          <Typography className="mt-2 text-gray-700">
            Serving: <code className="code">{selectedModel}</code>
          </Typography>
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
              step={0.1}
              onChange={(value) => setIouThreshold(value.target.value)}
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
              step={0.1}
              onChange={(value) => setScoreThreshold(value.target.value)}
            />
          </div>
        </CardBody>
      </Card>

      <div className="content mt-6 flex flex-col items-center">
        <img
          src="#"
          ref={imageRef}
          className="mt-4 rounded-lg shadow-md"
          onLoad={() => detect(imageRef.current, model, canvasRef.current, iouThreshold, scoreThreshold)}
        />
        <video
          autoPlay
          muted
          ref={cameraRef}
          className="mt-4 rounded-lg shadow-md"
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current, iouThreshold, scoreThreshold)}
        />
        <video
          autoPlay
          muted
          ref={videoRef}
          className="mt-4 rounded-lg shadow-md"
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current, iouThreshold, scoreThreshold)}
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
          className="mt-4 rounded-lg shadow-md"
        />
      </div>

      <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} />
    </div>
  );
};

export default App;
