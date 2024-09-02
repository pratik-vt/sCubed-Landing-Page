import { style } from "@vanilla-extract/css";

export const navStyle = style({
  fontSize: "18px",
  color: "#474747",
  fontWeight: "400",
  textDecoration: "none",
  marginRight: "50px",
  position: "relative",
});

export const activeNavStyle = style([navStyle, {
  color: "#000",
}]);