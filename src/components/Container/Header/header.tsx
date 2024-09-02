import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import banner from "../../../images/Banner.jpg";
import logo from "../../../images/HeaderLogo.png";
import Button from "../../Button/button";
import { StaticImage } from "gatsby-plugin-image";
import {
  textBlockStyle,
  bannerImg,
  headingStyle,
  hamburger,
  bar,
  navmenu,
  navMenuOpen,
  activeLinkStyle,
  headerContentStyles,
  logoOuter,
  buttonStyle,
  descStyle,
} from "../../Container/style.css";

import BookDemoForm from "../../ModalForm";
import { activeNavStyle, navStyle } from "./styles.css";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const pageStyles: React.CSSProperties = {
  position: "relative",
  width: "100%",
};

const imgStyles: React.CSSProperties = {
  width: "100%",
  height: "auto",
};

// const navStyle: React.CSSProperties = {
//   fontSize: "18px",
//   color: "#474747",
//   fontWeight: "400",
//   textDecoration: "none",
//   marginRight: "50px",
//   position: "relative",
// };

// const activeNavStyle: React.CSSProperties = {
//   ...navStyle,
//   color: "#000",
// };

const demoStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#333",
  fontWeight: "700",
  background: "#a0f5d1",
};

const headerWrapperStyles: React.CSSProperties = {
  width: "100%",
  position: "fixed",
  top: 0,
  zIndex: 1,
  borderBottom: "1px solid #ededef",
  transition: "background-color 0.3s ease",
};

const Header: React.FC<Props> = ({ children }) => {
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <main style={pageStyles}>
      <div
        style={{
          ...headerWrapperStyles,
          backgroundColor: headerBackground ? "#fff" : "transparent",
        }}
      >
        <div className={headerContentStyles}>
          <div className={logoOuter}>
            {/* <img src={logo} alt="Logo" /> */}
            <StaticImage
              alt="Description of the image"
              src="../../../images/HeaderLogo.png"
              quality={100}
              placeholder="blurred"
            />
          </div>
          <nav className={`${navmenu} ${menuOpen ? navMenuOpen : ""}`}>
            <Link to="/" className={navStyle} activeClassName={activeNavStyle}>
              Home <span className={activeLinkStyle} />
            </Link>
            <a href={process.env.GATSBY_GET_STARTED_LINK} className={navStyle}>
              Get Started
            </a>
            <Button
              className={buttonStyle}
              color="#fff"
              backgroundColor="#7a7eed"
              width="170px"
              onClick={() =>
                window.location.replace(process.env.GATSBY_LOGIN_LINK as string)
              }
            >
              Login
            </Button>
          </nav>
          <div className={hamburger} onClick={toggleMenu}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={bar}></div>
            ))}
          </div>
        </div>
      </div>
      <StaticImage 
        // height={1060}
             alt="Description of the image"
            src="../../../images/Banner.jpg"
            layout="fullWidth"
            quality={100}
            placeholder="blurred"
            className={bannerImg}
             />
      {/* <img className={bannerImg} src={banner} alt="Banner" /> */}
      <div className={textBlockStyle}>
        <p className={headingStyle}>
          Empowering Your Practice, Enhancing Every Life You Touch
        </p>
        <p className={descStyle}>
          S Cubed is an all-in-one platform packed with powerful Clinical &
          Practice Management functionalities allowing you to focus on
          delivering exceptional care with less hassle and enhanced results.
        </p>
        <BookDemoForm
          buttonColor="rgb(51, 51, 51)"
          buttonBackground="#a0f5d1"
        />
        {/* <Button
          style={demoStyle}
          color="#fff"
          backgroundColor="#a0f5d1"
          width="180px"
          onClick={() => alert("Button clicked!")}
        >
          BOOK A DEMO
        </Button> */}
      </div>
    </main>
  );
};

export default Header;
