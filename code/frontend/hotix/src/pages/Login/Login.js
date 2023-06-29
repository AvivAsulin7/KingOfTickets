import React from "react";
import Header from "../../components/Header";
import Button from "../../components/reusable-components/Button";
import GridWrap from "../../components/reusable-components/GridWrap";
import { Typography, Stack, Box } from "@mui/material";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CustomLink } from "../../styles/Styles";
import { ImHome } from "react-icons/im";
import { CustomDivider, styleIcon, stackIcons } from "../../styles/login";

const Login = () => {
  return (
    <GridWrap>
      <Header />
      <Stack sx={{ marginTop: "70px", display: "block", width: "80%" }}>
        <CustomLink to={"/signin"} state={{ screen: "signin" }}>
          <Button>Sign in</Button>
        </CustomLink>
        <CustomLink to={"/signup"} state={{ screen: "signup" }}>
          <Button background="#fff" color="black" border="1px solid black">
            Sign up
          </Button>
        </CustomLink>
      </Stack>
      <Stack sx={{ paddingTop: "60px", textAlign: "center" }}>
        <CustomDivider textAlign="center">
          <Typography color="#888888" fontSize="12px">
            or use one of these options
          </Typography>
        </CustomDivider>
        <Stack direction="row" sx={stackIcons}>
          <Box color="#3b5998">
            <FaFacebookF style={styleIcon} />
          </Box>
          <Box>
            <FaApple style={styleIcon} />
          </Box>
          <Box>
            <FcGoogle style={styleIcon} />
          </Box>
        </Stack>
        <CustomDivider></CustomDivider>
        <Typography color="#888888" fontSize="12px" marginTop="20px">
          By signing in or creating an account,
          <br /> you agree with our Terms & conditions and Privacy statement
        </Typography>
        <CustomDivider textAlign="center" sx={{ marginTop: "30px" }}>
          <Typography color="#888888" fontSize="12px">
            Go to Home
          </Typography>
        </CustomDivider>
        <Stack direction="row" sx={stackIcons}>
          <Box>
            <CustomLink to={"/"}>
              <ImHome style={styleIcon} color="black" />
            </CustomLink>
          </Box>
        </Stack>
        <CustomDivider></CustomDivider>
      </Stack>
    </GridWrap>
  );
};

export default Login;
