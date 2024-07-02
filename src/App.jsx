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
  const [selectedModel, setSelectedModel] = useState("fire_s");

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
    <div className="App bg-gray-900 text-white min-h-screen">
      {loading.loading && (
        <Loader>
          Loading model... <Progress value={loading.progress * 100} size="lg" color="blue" />
        </Loader>
      )}
      <Card className="max-w-4xl mx-auto mt-6 bg-gray-800">
        <CardBody>
          <Typography variant="h2" color="white">
            📷 YOLOv8 Live Detection App
          </Typography>
          <Typography className="mt-4">
            YOLOv8 live detection application on browser powered by <code>tensorflow.js</code>
          </Typography>
          <Typography className="mt-2">
            Serving: <code className="code">{selectedModel}</code>
          </Typography>
          <div className="mt-4">
            <Select
              label="Select Model"
              value={selectedModel}
              onChange={handleModelChange}
              color="blue"
            >
              <Option value="yolov8n">YOLOv8n</Option>
              <Option value="fire_l">Fire_L</Option>
              <Option value="fire_m">Fire_M</Option>
              <Option value="fire_n">Fire_N</Option>
              <Option value="fire_s">Fire_S</Option>
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="content mt-6 flex justify-center items-center flex-col">
        <img
          src="#"
          ref={imageRef}
          className="mt-4"
          onLoad={() => detect(imageRef.current, model, canvasRef.current)}
        />
        <video
          autoPlay
          muted
          ref={cameraRef}
          className="mt-4"
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current)}
        />
        <video
          autoPlay
          muted
          ref={videoRef}
          className="mt-4"
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
          className="mt-4"
        />
      </div>

      <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} />
    </div>
  );
};

export default App;
