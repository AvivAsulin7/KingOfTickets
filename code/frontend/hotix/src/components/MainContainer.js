import React from "react";
import { Grid } from "@mui/material";

const MainContainer = (props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        // justifyContent: "center",
        minHeight: "100vh",
        width: "auto",
        background: "#fff",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {props.children}
    </Grid>
  );
};

export default MainContainer;
