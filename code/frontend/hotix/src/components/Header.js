import React from "react";
import { Stack } from "@mui/material";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <Stack marginTop="40px" direction="row">
      <img src={logo} alt="logo"></img>
    </Stack>
  );
};

export default Header;
