import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { image } from "cloudinary-react";
import { authContext } from "../contexts/authContext";

const AvatarImage = ({ styleimage, userImage }) => {
  return <Avatar alt="image-profile" src={userImage} sx={styleimage} />;
};

export default AvatarImage;
