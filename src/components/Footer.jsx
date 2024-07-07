import React from "react";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto px-4 text-center">
        <Typography variant="small" className="text-gray-400 mb-2">
          Made with love by Vishwas ❤️
        </Typography>
        <Typography variant="small" className="text-gray-400">
          © 2024 Fire Detection System. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
