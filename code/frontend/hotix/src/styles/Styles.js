import { Input, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

export const CustomLink = styled(Link)({
  textDecoration: "none",
});

export const StyledInput = styled(Input)({
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  cursor: "pointer",
});

export const StyledLabel = styled("label")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "150px",
  height: "150px",
  border: "2px dashed #9e9e9e",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

export const IconWrapper = styled("div")({
  marginBottom: "16px",
  color: "#9e9e9e",
});

export const MessageWrapper = styled("div")({
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Message = styled(Typography)({
  marginTop: "16px",
  color: "#4caf50",
});

export const CustomButton = styled(Button)(({ props, theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
  backgroundColor: props.background || "rgb(100, 67, 238)",
  width: props.width || "100%",
  color: props.color || "#fff",
  border: props.border || "1px solid rgb(100, 67, 238)",
  fontSize: props.fontsize || "large",
  textTransform: "Capitalize",
  padding: props.padding,
  margin: props.margin || "15px 0 0",
  height: props.height,
  borderradius: "10px",
  "&:hover": {
    color: "#fff" || props.colorHover,
    backgroundColor: "rgb(55, 48, 107)" || props.backgorundhover,
    border: "1px solid black",
    transition: "all .5s ease-in-out",
  },
  "&:disabled": {
    color: "#333333",
    background: "#999999",
    border: "none",
  },
}));

export const CustomGrid = styled(Grid)(({ props }) => ({
  margin: props.margin || "auto",
  padding: props.padding || "auto",
  display: props.display || "flex",
  flexDirection: "column",
  alignItems: props.alignItems || "center",
  textAlign: "center",
  width: props.width || "auto",
  height: props.height,
  justifyContent: "space-around",
}));

//// Event Component:
export const cardStyle = {
  margin: ["20px 10px"],
  paddingBottom: "10px",
  height: ["17.5rem", "24rem", "22rem"],
  width: ["auto"],
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "center",
};

export const OptionsProfileButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  borderRadius: "20%",
  fontSize: ["24px", "50px", "28px"],
});
