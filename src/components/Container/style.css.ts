import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body ,img", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  fontFamily: "Poppins, sans-serif",
  maxWidth: "100%",
});

export const ContainerStyle = style({
  outline: `none`,
  borderWidth: `1px`,
});
export const InnerContainerStyle = style({
  maxWidth: `1400px`,
  width: `100%`,
  margin: `0 auto`,
  "@media": {
    "screen and (min-width: 768px) and (max-width:1480px)": {
      maxWidth: `1000px`,
    },
  },

});
// styles.css.ts

export const featureItem = style({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  borderRight: `1px solid #e2e2e2`,
  paddingRight: `80px`,
  "@media": {
    "screen and (max-width: 768px)": {
      gap: "20px",
      borderRight: `unset`,
      paddingRight: `0px`,
      width: '41%'
    },
  },
});

export const featureText = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "18px",
  color: "#333",
  fontWeight: "400",

});
export const featureTexts = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "18px",
  color: "#333",
  fontWeight: "400",
  "@media": {
    "screen and (max-width: 600px)": {
      flexDirection: `row`
    },
  },
});

export const sectionHeading = style({
  fontSize: "48px",
  color: `#333`,
  fontWeight: `700`,
  textAlign: `center`,
  marginBottom: `30px`,
  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: `28px`,
      marginTop: `30px`
    },
  },
});
export const sectiondesc = style({
  fontSize: "20px",
  color: `#6e6e6e`,
  fontWeight: `400`,
  textAlign: `center`,
  maxWidth: `970px`,
  width: `100%`,
  margin: `0 auto 40px auto`,
  "@media": {
    "screen and (max-width: 768px)": {

    },
    "screen and (max-width: 600px)": {
      maxWidth: `350px`,

    },
  },
});
export const disciplineWrapper = style({
  marginTop: `80px`,
  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: `5px`,


    },
  },
});
export const tab = style({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  fontSize: `24px`,
  color: `#333`,
  fontWeight: `500`,
  "@media": {
    "screen and (max-width: 768px)": {
      position: `relative`,
      marginBottom: `10px`



    },
  },
});
export const tabsList = style({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  borderBottom: `1px solid #ededef`,
  marginBottom: `35px`,
  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: `column`,



    },
  },
});
export const tabData = style({
  maxWidth: `240px`,
  width: `100%`,
  textAlign: `center`,
});

export const panelHeading = style({
  fontSize: `36px`,
  fontWeight: `700`,
  color: `#333`,
  maxWidth: `464px`,
  marginBottom: `34px`,
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: `center`,
      fontSize: `24px`,
      marginBottom: `15px`,
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      maxWidth: `100%`,
    },
  },
});
export const panelContent = style({
  display: `flex`,
  flexDirection: `column`,
  padding: `30px 0`,
  "@media": {
    "screen and (max-width: 768px)": {
      alignItems: `center`,
      padding: `10px 0`,
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      alignItems: `center`,
    },
  },
});
export const tabPanel = style({
  display: `flex`,
  gap: `30px`,
  transition: `opacity 0.3s ease-in-out`,
  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: `column`,
      gap: `20px`,



    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      flexDirection: `column`,
      alignItems: `center`
    },
  },
});
export const mobileTabPanel = style({
  // display: `block`,
})
export const sectiondesnew = style({
  fontSize: "20px",
  color: `#6e6e6e`,
  fontWeight: `400`,
  maxWidth: `464px`,
  marginBottom: `40px`,
  width: `100%`,
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: `center`,

    },
    "screen and (max-width: 600px)": {
      maxWidth: `350px`,

    },
  },
});

export const featureItems = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "30px",
  justifyContent: `space-between`,
  width: `100%`,
  "@media": {
    "screen and (max-width: 1100px)": {
      alignItems: "center",
      gap: "20px",
      justifyContent: "center",
      padding: `0 25px`,
      flexDirection: `column`,

    },
    "screen and (max-width: 600px)": {
      flexWrap: "wrap",
    },

  },
});

export const standWrapper = style({
  display: "flex",
  alignItems: "flex-start",
  gap: `20px`,
});
export const featureContainers = style({
  width: "100%",
  padding: "40px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: `wrap`,
  gap: `40px`,

  "@media": {
    "screen and (max-width: 768px)": {
      flexWrap: `wrap`,
      alignItems: "center",
      gap: "20px",
      justifyContent: `center`,
    },
  },
});
export const textBlockStyles = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  borderRadius: "5px",
  maxWidth: "1400px",
  width: "100%",
  marginBottom: "100px",
  paddingBottom: `20px`,
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: "center",
    },
    "screen and (min-width: 768px) and (max-width: 1480px)": {
      maxWidth: "1000px",
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      textAlign: `center`,
    },
  },
});
export const heroStyles = style({
  position: "relative",
});
export const heroHeading = style({
  fontSize: `60px`,
  color: `#fff`,
  fontWeight: `700`,
  textAlign: `left`,
  maxWidth: `1200px`,
  marginTop: `0`,
  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: `24px`,
      textAlign: `center`,
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      fontSize: `20px`,
      textAlign: `center`,
    },
  },
});

export const heroimg = style({
  width: `100%`,

  "@media": {
    "screen and (max-width: 768px)": {
      height: `50vh`,
    },
  },
});

export const bannerImg = style({
  width: `100%`,
  maxHeight: `800px`,

  "@media": {
    "screen and (max-width: 768px)": {
      height: `65vh`,
    },
    "screen and (max-width: 375px)": {
      height: `90vh`,
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      minHeight: `800px`
    },
  },
});


export const partnerdesc = style({
  fontSize: "20px",
  color: `#6e6e6e`,
  fontWeight: `400`,
  textAlign: `center`,
  maxWidth: `700px`,
  width: `100%`,
  margin: `0 auto 40px auto`,
  "@media": {
    "screen and (max-width: 600px)": {
      maxWidth: `350px`,

    },
  },
});
export const partnerdescright = style({
  fontSize: "18px",
  color: `#6e6e6e`,
  fontWeight: `400`,
  maxWidth: `550px`,
  marginBottom: `40px`,
  width: `100%`,
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: `left`,
    },
    "screen and (max-width: 600px)": {
      maxWidth: `350px`,
    },
  },
});

export const partnerInfo = style({
  display: `flex`,
  alignItems: `baseline`,
  gap: `15px`,
  "@media": {
    "screen and (max-width: 768px)": {
      padding: `0 20px`,
    },
  },
});
export const footer = style({
  width: `100%`,
  background: `#000`,
  padding: `70px 0 34px 0`,
  "@media": {
    "screen and (max-width: 768px)": {
      padding: `0px 0 34px 0`,
    },
  },
});
export const footerLogo = style({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  "@media": {
    "screen and (max-width: 1200px)": {
      flexDirection: `column`,
      justifyContent: `center`,
      gap: `20px`,
      padding: `30px 0 0 0`
    },
  },
});
export const footerContent = style({
  display: `flex`,
  alignItems: `baseline`,
  justifyContent: `space-between`,
  borderBottom: `1px solid #fff`,
  padding: `10px 0 25px 0`,
  "@media": {
    "screen and (max-width: 1200px)": {
      flexDirection: `column`,
      paddingTop: `20px`
    },
  },
});

export const bottomFooter = style({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  paddingTop: `30px`,
  "@media": {
    "screen and (max-width: 1200px)": {
      padding: `20px 0 0px 0`,
      flexDirection: `column`
    },
  },
});
export const footerLinks = style({
  display: `flex`,
  alignItems: `center`,
  gap: `20px`,
});
export const links = style({
  color: `#fff`,
  textDecoration: `none`,
  fontSize: `18px`,
  fontWeight: `400`,
});
export const rights = style({
  color: `#fff`,
  textDecoration: `none`,
  fontSize: `18px`,
  fontWeight: `400`,
});
export const inputField = style({
  maxWidth: `200px`,
  padding: `10px`,

  border: `none`,
  borderRadius: "5px",
  marginRight: `10px`,
  backgroundColor: `#fff`,
  color: `#222`,

  selectors: {
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
});
export const Submitbtn = style({
  padding: `8px 20px`,
  border: `none`,
  backgroundColor: `#7a7eed`,
  color: `#fff`,
  cursor: `pointer`,
  fontSize: `16px`,
  fontWeight: `700`,
  borderRadius: `5px`,

});
export const textBlockStyle = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  // padding: "20px",
  borderRadius: "5px",
  maxWidth: "80%",
  textAlign: "center",
  "@media": {
    "screen and (max-width: 768px)": {
      maxWidth: `unset`,
      width: `100%`
    },

  },
});


export const headingStyle = style({
  fontSize: `48px`,
  color: `#333`,
  fontWeight: `700`,
  maxWidth: `866px`,
  width: `100%`,
  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: `28px`,
      textAlign: `center`,
      marginTop: `100px`
    },
  },
});

export const hamburger = style({
  display: 'none',
  flexDirection: 'column',
  cursor: 'pointer',
  zIndex: 2,
  "@media": {
    "screen and (max-width: 768px)": {
      display: 'flex',
      marginRight: `15px`
    },
  },
});

export const bar = style({
  width: '25px',
  height: '3px',
  backgroundColor: '#333',
  margin: '4px 0',
  transition: '0.3s',
});

export const navmenu = style({
  display: 'flex',
  alignItems: 'center',
  "@media": {
    "screen and (max-width: 768px)": {
      display: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      top: '112px',
      width: '100%',
      backgroundColor: '#fff',
      borderTop: '1px solid #ededef',
      minHeight: '90vh',
      gap: '30px',
      padding: `30px 0`

    },
  },
});

export const navMenuOpen = style({
  display: 'flex !important',
});

export const activeLinkStyle = style({
  content: '""',
  display: "block",
  width: "52px",
  height: "5px",
  backgroundColor: "#7a7eed",
  position: "absolute",
  bottom: "-47px",
  left: "50%",
  transform: "translateX(-50%)",
  "@media": {
    "screen and (max-width: 768px)": {
      bottom: "-8px",
    },
  },
});
export const footerDesc = style({
  fontSize: `18px`,
  color: `#ffffff`,
  fontWeight: `400`,
  maxWidth: `802px`,
  width: `100%`,
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: `center`
    },
    "screen and (max-width: 600px)": {
      maxWidth: `350px`,
      margin: `0px auto 20px auto`,
      width: `100%`
    },
    "screen and (min-width:768px) and (max-width: 1480px)": {
      maxWidth: `662px`,
      margin: `0px auto 20px auto`,
      width: `100%`
    },


  },

});
export const tabBox = style({
  marginTop: `80px`,
  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: `50px`,
    },
  },
});
export const headerContentStyles = style({
  maxWidth: "1400px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  color: "#000",
  "@media": {
    "screen and (max-width: 768px)": {
      padding: "0",
      background: `#fff`
    },
  },
});

export const logoOuter = style({
  "@media": {
    "screen and (max-width: 768px)": {
      margin: `10px 15px`,
    },
  },

});
export const buttonStyle = style({
  fontSize: "18px",
  lineHeight: "32px",
  color: "#ffffff",
  fontWeight: "700",
  background: "#7a7eed",
  "@media": {
    "screen and (max-width: 768px)": {
      width: `90% !important`
    },
  },

});

export const form = style({
  "@media": {
    "screen and (max-width: 1200px)": {
      display: `flex`,
      justifyContent: `center`,
      width: `100%`,
      alignItems: `center`

    },
  },
});

export const tabPanelImage = style({
  maxWidth: "820px",
  width: "100%",
  padding: `0 20px`,

})




export const tabsContainer = style({
  display: 'flex',
  flexDirection: 'column', // Ensures vertical stacking
  '@media': {
    'screen and (max-width: 768px)': {
      // Mobile-specific styles
    },
  },
});

export const descStyle = style({
  fontSize: "20px",
  lineHeight: "32px",
  color: "#6e6e6e",
  fontWeight: "400",
  maxWidth: "735px",
  width: "100%",
  margin: "0 auto 50px auto",
  '@media': {
    'screen and (max-width: 768px)': {
      color: `#000`
    },
  },
});
export const disciplineImg = style({
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `0 30px`
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      padding: `0 30px`
    },
  },
});

export const demoSection = style({
  '@media': {
    'screen and (min-width: 968px)': {
      marginRight: `165px`
    },
    "screen and (min-width: 768px) and (max-width: 1200px)": {
      alignItems: `center`,
    },
  },
})