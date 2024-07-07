import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import PopoverWithDescription from "./PopoverComponent";
import {
  MdAdjust,
  MdBarChart,
  MdCheckCircle,
  MdCircleNotifications,
  MdOutlineAdjust,
  MdOutlineFireplace,
  MdScoreboard,
  MdStart,
} from "react-icons/md";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const ConfigSummary = ({
  selectedModel,
  iouThreshold,
  scoreThreshold,
  smokeAlert,
  fireAlert,
  setFireAlert,
  openDrawer,
  setSmokeAlert,
}) => {
  const handleSmokeAlertClick = () => {
    const updatedSmokeAlert = !smokeAlert;
    setSmokeAlert(updatedSmokeAlert);
    localStorage.setItem("smokeAlert", updatedSmokeAlert.toString());
  };

  const handleFireAlertClick = () => {
    const updatedFireAlert = !fireAlert;
    setFireAlert(updatedFireAlert);
    localStorage.setItem("fireAlert", updatedFireAlert.toString());
  };

  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-4">
      {/* Serving Model Card */}
      <PopoverWithDescription
        buttonLabel={
          <Card className="bg-white rounded-lg shadow-md " onClick={openDrawer}>
            <CardBody className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <img src="eye.gif" className="h-[4rem]" />
                <Typography variant="h6" className="font-medium text-gray-700">
                  Model
                </Typography>
              </div>
              <Typography variant="body" className="text-gray-500 mt-2">
                <code className="code px-3">{selectedModel}</code>
              </Typography>
            </CardBody>
          </Card>
        }
        title="Serving Model"
        description="Select YOLOv8 model types based on your requirements."
        chipLabel={`Serving: ${selectedModel} Model`}
        items={[
          {
            icon: MdCheckCircle,
            label: "YOLOv8 N",
            iconColor: "text-blue-700",
          },
          {
            icon: MdCircleNotifications,
            label: "YOLOv8 M",
            iconColor: "text-blue-700",
          },
          {
            icon: MdCircleNotifications,
            label: "YOLOv8 S",
            iconColor: "text-blue-700",
          },
          {
            icon: MdCircleNotifications,
            label: "YOLOv8 L",
            iconColor: "text-blue-700",
          },
        ]}
      />

      <PopoverWithDescription
        buttonLabel={
          <Card
            className="bg-white rounded-lg shadow-md cursor-pointer"
            onClick={openDrawer}
          >
            <CardBody className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <img src="views.gif" className="h-[4rem]" />

                <Typography variant="h6" className="font-medium text-gray-700">
                  IOU Threshold
                </Typography>
              </div>
              <Typography variant="body" className="text-gray-500 mt-2">
                {iouThreshold} %
              </Typography>
            </CardBody>
          </Card>
        }
        title="IoU Threshold"
        description="Intersection over Union threshold, range: 0 to 100%."
        chipLabel={`${iouThreshold} %`}
        items={[
          { icon: MdOutlineAdjust, label: "0.5", iconColor: "text-green-700" },
          { icon: MdAdjust, label: "0.7", iconColor: "text-green-700" },
        ]}
      />

      {/* Score Threshold Card */}
      <PopoverWithDescription
        buttonLabel={
          <Card
            className="bg-white rounded-lg shadow-md cursor-pointer"
            onClick={openDrawer}
          >
            <CardBody className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <img src="line-bars.gif" className="h-[4rem]" />
                <Typography variant="h6" className="font-medium text-gray-700">
                  Score Threshold
                </Typography>
              </div>
              <Typography variant="body" className="text-gray-500 mt-2">
                {scoreThreshold} %
              </Typography>
            </CardBody>
          </Card>
        }
        title="Score Threshold"
        description="Confidence score threshold, range: 0 to 100%."
        chipLabel={`${scoreThreshold} %`}
        items={[
          { icon: MdBarChart, label: "50%", iconColor: "text-yellow-700" },
          { icon: MdScoreboard, label: "75%", iconColor: "text-yellow-700" },
        ]}
      />

      {/* Smoke Alert Card */}
      <div onClick={handleSmokeAlertClick}>
        <PopoverWithDescription
          buttonLabel={
            <Card
              className="bg-white rounded-lg shadow-md cursor-pointer"
              onClick={handleSmokeAlertClick}
            >
              <CardBody className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <img
                    src="fire-alarm.gif"
                    className={`h-[4rem] ${
                      smokeAlert
                        ? "text-green-500 text-3xl animate-flash mr-2"
                        : "text-red-500 text-3xl animate-shake mr-2"
                    }`}
                  />
                  <Typography
                    variant="h6"
                    className="font-medium text-gray-700"
                  >
                    Smoke Alert
                  </Typography>
                </div>
                <Typography
                  variant="body"
                  className={smokeAlert ? "text-green-500" : "text-red-500"}
                  mt-2
                >
                  {smokeAlert ? "Enabled" : "Disabled"}
                </Typography>
              </CardBody>
            </Card>
          }
          title="Fire Alert Toggler"
          description="Toggle fire alerts on or off for detection."
          chipLabel={smokeAlert ? "Enabled" : "Disabled"}
          items={[
            {
              icon: MdOutlineFireplace,
              label: "Enabled",
              iconColor: "text-red-700",
            },
            {
              icon: MdOutlineFireplace,
              label: "Disabled",
              iconColor: "text-gray-700",
            },
          ]}
        />
      </div>
      {/* Fire Alert Card */}
      <div onClick={handleFireAlertClick}>
        <PopoverWithDescription
          buttonLabel={
            <Card className="bg-white rounded-lg shadow-md cursor-pointer">
              <CardBody className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <img
                    src="fire.gif"
                    className={`h-[4rem] ${
                      fireAlert
                        ? "text-green-500 text-3xl animate-flash mr-2"
                        : "text-red-500 text-3xl animate-shake mr-2"
                    }`}
                  />
                  <Typography
                    variant="h6"
                    className="font-medium text-gray-700"
                  >
                    Fire Alert
                  </Typography>
                </div>
                <Typography
                  variant="body"
                  className={fireAlert ? "text-orange-500" : "text-red-500"}
                  mt-2
                >
                  {fireAlert ? "Enabled" : "Disabled"}
                </Typography>
              </CardBody>
            </Card>
          }
          title="Smoke Alert Toggler"
          description="Toggle smoke alerts on or off for detection."
          chipLabel={fireAlert ? "Enabled" : "Disabled"}
          items={[
            {
              icon: ExclamationCircleIcon,
              label: "Enabled",
              iconColor: "text-gray-700",
            },
            {
              icon: ExclamationCircleIcon,
              label: "Disabled",
              iconColor: "text-gray-700",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ConfigSummary;
