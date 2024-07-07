import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import FeatureSection from "./FeatureSection";

function HeroSection() {
  return (
    <>
      <header className="bg-gray-100 p-8">
        <div className="grid mt-16 w-full  place-items-stretch">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
              Real-time Fire Detection using YOLOv8
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
              Enhance Safety with AI-driven Detection
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              Detect fires swiftly and accurately with our advanced YOLOv8-based
              system. Experience real-time alerts and proactive monitoring.
            </Typography>
          </div>
          <div className="my-2 flex w-full flex-col gap-4 md:flex-row justify-center">
            <Button color="gray" className="w-full px-4 md:w-[12rem]">
              get started
            </Button>
          </div>
        </div>
      </header>
      <FeatureSection />
    </>
  );
}

export default HeroSection;
