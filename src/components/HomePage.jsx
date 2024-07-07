import React from "react";
import HeroSection from "./HeroSection";
import App from "../App";
import NavBarSection from "./NavBarSection";
// import FeatureSection from "./FeatureSection";

function Homepage() {
  const [feature, setfeature] = React.useState(false);

  return (
    <div>
      <NavBarSection feature={feature} setfeature={setfeature} />
      {!feature ? <HeroSection /> : <App />}
    </div>
  );
}

export default Homepage;
