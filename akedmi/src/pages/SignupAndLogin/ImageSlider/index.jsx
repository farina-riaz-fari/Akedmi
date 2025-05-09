import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import buildingsImg from "../../../assets/buildings.jpg";
import companyImg from "../../../assets/companies.jpg";
import companies from "../../../assets/companyView.jpg";

const fadeImages = [
  { url: companyImg },
  { url: companies },
  { url: buildingsImg },
];

const ImageSlider = () => {
  return (
    <div className="slide-container">
      <Fade
        duration={2000}
        transitionDuration={500}
        infinite
        arrows={false}
        indicators={true}
      >
        {fadeImages.map((fadeImage, index) => (
          <div
            key={index}
            className="each-fade relative w-full sm:h-[850px] h-[500px] overflow-hidden"
          >
            <img
              src={fadeImage.url}
              className="w-full h-full object-cover rounded-2xl opacity-60"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute text-[#303972] text-5xl text-center font-extrabold top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
                Multi Companies
              </h2>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default ImageSlider;
