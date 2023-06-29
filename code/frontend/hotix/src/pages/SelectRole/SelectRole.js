import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/reusable-components/Button";
import GridWrap from "../../components/reusable-components/GridWrap";
import { CustomLink } from "../../styles/Styles";
import { authContext } from "../../contexts/authContext";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { useParams } from "react-router-dom";
import { Typography, Stack, Grid } from "@mui/material";

const SelectRole = () => {
  const [userName, setUserName] = useState({});
  const { isLoading, error, sendRequest } = useHttpRequest();
  const { id } = useParams();
  const auth = useContext(authContext);

  useEffect(() => {
    const fetchUser = async () => {
      let result;
      try {
        result = await sendRequest(`getUser/${id}`, "GET");
        setUserName(result.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <GridWrap>
      <Typography
        color="rgb(100, 67, 238)"
        fontWeight="bold"
        width="100%"
        variant="h3"
        textTransform="uppercase"
      >
        HEY, {userName.first_name} {userName.last_name}
      </Typography>
      <Typography color="#888888" fontSize="18px" marginTop="8%">
        What would you like to do today?
      </Typography>
      <Stack
        sx={{
          marginTop: "50px",
          textAlign: "center",
          display: "block",
          width: "70%",
        }}
      >
        <CustomLink to={"/"} onClick={() => auth.changeState("seller")}>
          <Button>Sell ticket</Button>
        </CustomLink>
        <CustomLink to={"/"} onClick={() => auth.changeState("buyer")}>
          <Button background="black" border="1px solid black">
            Buy ticket
          </Button>
        </CustomLink>
      </Stack>
    </GridWrap>
  );
};

export default SelectRole;
