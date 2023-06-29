import React from "react";
import { CustomButton } from "../../styles/Styles";

const Button = (props) => {
  return (
    <CustomButton
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      props={props}
      value={props.value}
      name={props.name}
      id={props.id}
    >
      {props.children}
    </CustomButton>
  );
};

export default Button;
