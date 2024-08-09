import * as React from "react";
import banner from "../../../images/Banner.jpg";
import logo from "../../../images/Header Logo.png";

import hero from "../../images/Image.jpg"
import Button from "../Button/button";
import {heroStyles,heroimg ,textBlockStyles,heroHeading,InnerContainerStyle } from "../Container/style.css";

type Props = {
  children?: JSX.Element | JSX.Element[];
};
const demoStyle: React.CSSProperties = {
    fontSize: `18px`,
    lineHeight: `32px`,
    color: `#333`,
    fontWeight: `700`,
    
  };


const Hero: React.FC<Props> = ({ children }) => {


  return (
    <main className={heroStyles}>
       
     <img className={heroimg } src={hero} alt="banner" />
      <div className={InnerContainerStyle }>
      <div className={textBlockStyles}>
          <p className={heroHeading}>Ready to scale your business with our easy-to-use clinical and practice management platform?</p>
         
         

          <Button
              style={demoStyle}
              color="#000"
              backgroundColor="#fff"
              width="180px"
              onClick={() => alert("Button clicked!")}
            >
              BOOK A DEMO
            </Button>
        </div>
        </div>
    </main>
  );
};

export default Hero;
