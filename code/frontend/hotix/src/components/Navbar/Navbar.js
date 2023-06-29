import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { BiHome, BiSearch } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdStars } from "react-icons/md";
import { CustomLink } from "../../styles/Styles";
import { authContext } from "../../contexts/authContext";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import "./Navbar.css";

function Navbar() {
  const [isActive, SetIsActive] = useState("");
  const [userImage, setUserImage] = useState();
  const { sendRequest } = useHttpRequest();
  const auth = useContext(authContext);

  useEffect(() => {
    const fetchUser = async () => {
      let result;
      try {
        result = await sendRequest(`getUser/${auth.userId}`, "GET");
        setUserImage(result.image.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        bottom: 0,
        top: "auto",
        width: "100%",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        background: "rgb(100, 67, 238)",
        padding: "0 10px",
      }}
    >
      <Grid
        sx={{
          padding: "0 40px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Tooltip title="Home">
            <CustomLink
              to={"/"}
              sx={{ color: "white" }}
              onClick={() => SetIsActive("home")}
              className={isActive === "home" ? "active" : "style"}
            >
              <BiHome size="20px" />
            </CustomLink>
          </Tooltip>
          <Tooltip title="Event search">
            <CustomLink
              sx={{ color: "white" }}
              onClick={() => SetIsActive("search")}
              className={isActive === "search" ? "active" : "style"}
            >
              <BiSearch size="20px" />
            </CustomLink>
          </Tooltip>

          <CustomLink
            sx={{ color: "white" }}
            onClick={() => SetIsActive("add")}
            className={isActive === "add" ? "active" : "style"}
          >
            <IoMdAddCircleOutline size="20px" />
          </CustomLink>

          <Tooltip title="My Favorites">
            <CustomLink
              sx={{ color: "white" }}
              onClick={() => SetIsActive("favorite")}
              className={isActive === "favorite" ? "active" : "style"}
            >
              <MdStars size="20px" />
            </CustomLink>
          </Tooltip>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Profile">
              <CustomLink
                to={"/profile"}
                onClick={() => SetIsActive("profile")}
                className={isActive === "profile" ? "active" : "style"}
              >
                <Avatar
                  alt="image-profile"
                  src={userImage}
                  sx={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #fff",
                  }}
                />
              </CustomLink>
            </Tooltip>
          </Box>
        </Toolbar>
      </Grid>
    </AppBar>
  );
}
export default Navbar;
