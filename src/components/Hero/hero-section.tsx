import React from "react";
import banner from "../../../images/Banner.jpg";
import logo from "../../../images/Header Logo.png";

import hero from "../../images/Image.jpg";
import Button from "../Button/button";
import {
  heroStyles,
  heroimg,
  textBlockStyles,
  heroHeading,
  InnerContainerStyle,
} from "../Container/style.css";
import ModalForm from "../ModalForm";
import { StaticImage } from "gatsby-plugin-image";

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
      {/* <img className={heroimg} src={hero} alt="banner" /> */}
      <StaticImage className={heroimg} src="../../images/Image.jpg" alt="banner" placeholder="blurred" quality={100} />
      <div className={InnerContainerStyle}>
        <div className={textBlockStyles}>
          <p className={heroHeading}>
            Ready to scale your business with our easy-to-use clinical and
            practice management platform?
          </p>
          <ModalForm buttonColor="#000" buttonBackground="#fff" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
