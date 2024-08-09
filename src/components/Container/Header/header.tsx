import React, { useState, useEffect } from "react";
import banner from "../../../images/Banner.jpg";
import logo from "../../../images/Header Logo.png";
import Button from "../../Button/button";
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
  buttonStyle
} from "../../Container/style.css";

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

const navStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#474747",
  fontWeight: "400",
  textDecoration: "none",
  marginRight: "50px",
  position: "relative",
};

const activeNavStyle: React.CSSProperties = {
  ...navStyle,
  color: "#000",
};

const descStyle: React.CSSProperties = {
  fontSize: "20px",
  lineHeight: "32px",
  color: "#6e6e6e",
  fontWeight: "400",
  maxWidth: "735px",
  width: "100%",
  margin: "0 auto 50px auto",
};

const demoStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#333",
  fontWeight: "700",
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
  const [activeLink, setActiveLink] = useState<string>("#link1");
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY > 135);
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
            <img src={logo} alt="Logo" />
          </div>
          <nav className={`${navmenu} ${menuOpen ? navMenuOpen : ''}`}>
            {["Home", "Features", "Pricing", "Get Started"].map((text, index) => {
              const linkId = `#link${index + 1}`;
              return (
                <a
                  key={linkId}
                  href={linkId}
                  style={activeLink === linkId ? activeNavStyle : navStyle}
                  onClick={() => setActiveLink(linkId)}
                >
                  {text}
                  {activeLink === linkId && <span className={activeLinkStyle} />}
                </a>
              );
            })}
            <Button
              className={buttonStyle}
              color="#333"
              backgroundColor="#a0f5d1"
              width="170px"
              onClick={() => alert("Button clicked!")}
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
      <img className={bannerImg} src={banner} alt="Banner" />
      <div className={textBlockStyle}>
        <p className={headingStyle}>
          Empowering Your Practice, Enhancing Every Life You Touch
        </p>
        <p style={descStyle}>
          S Cubed is an all-in-one platform packed with powerful Clinical &
          Practice Management functionalities allowing you to focus on
          delivering exceptional care with less hassle and enhanced results.
        </p>
        <Button
          style={demoStyle}
          color="#fff"
          backgroundColor="#7a7eed"
          width="180px"
          onClick={() => alert("Button clicked!")}
        >
          BOOK A DEMO
        </Button>
      </div>
    </main>
  );
};

export default Header;
