import React from "react";
import {
  sectionHeading,
  sectiondesc,
  InnerContainerStyle,
  disciplineWrapper,
} from "../Container/style.css";
import discipline from "../../images/Disciplines.png";
import { disciplineImg } from "../../components/Container/style.css";
import { StaticImage } from "gatsby-plugin-image";

const Disciplines: React.FC = () => (
  <div className={InnerContainerStyle}>
    <div className={disciplineWrapper}>
      <div className={sectionHeading}>Disciplines</div>
      <div className={sectiondesc}>
        S Cubed Platform simplifies the way you manage your practice and
        clinical process. It is designed to integrate with various disciplines
        allowing you to focus on your little clients’ well-being.
      </div>
      {/* <img
        className={disciplineImg}
        style={{ maxWidth: "100%", width: "100%" }}
        src={discipline}
        alt=""
      /> */}
      <StaticImage
        // style={{ maxWidth: "100%", width: "100%" }}
        className={disciplineImg}
        src="../../images/Disciplines.png"
        alt=""
        quality={100}
        width={1400}
        imgStyle={{ objectFit: "contain" }}
        placeholder="blurred"
      />
    </div>
  </div>
);

export default Disciplines;
