import React from "react";
import { Typography } from "@material-tailwind/react";

function FeatureItem({ title, description }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Typography variant="h2" color="blue-gray" className="font-bold mb-2">
        {title}
      </Typography>
      <Typography variant="small" className="text-gray-600">
        {description}
      </Typography>
    </div>
  );
}

function FeatureSection() {
  const features = [
    {
      title: "YOLOv8-n",
      description:
        "A lightweight YOLOv8 model optimized for fast inference on edge devices.",
    },
    {
      title: "YOLOv8-s",
      description:
        "A small-scale YOLOv8 model suitable for environments with limited computing resources.",
    },
    {
      title: "YOLOv8-m",
      description:
        "A medium-sized YOLOv8 model offering a balance between speed and accuracy.",
    },
    {
      title: "YOLOv8-l",
      description:
        "A large-scale YOLOv8 model for high-accuracy detection in complex scenarios.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Typography
          variant="h2"
          color="blue-gray"
          className="text-center font-bold text-3xl mb-8"
        >
          YOLOv8 Models for Fire Detection
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
