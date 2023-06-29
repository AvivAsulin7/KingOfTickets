import React from "react";
import { CustomGrid } from "../../styles/Styles";

const GridWrap = (props) => {
  return <CustomGrid props={props}>{props.children}</CustomGrid>;
};

export default GridWrap;
