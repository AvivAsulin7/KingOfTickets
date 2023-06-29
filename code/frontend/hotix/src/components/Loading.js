import React from "react";
import ModalApp from "./reusable-components/ModalApp";
import { TailSpin } from "react-loader-spinner";
import { Typography, Stack } from "@mui/material";

const Loading = () => {
  const open = true;
  return (
    <ModalApp open={open}>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "200px",
        }}
      >
        <TailSpin color="rgb(100, 67, 238)" />
        <Typography variant="h6">Loading...</Typography>
      </Stack>
    </ModalApp>
  );
};

export default Loading;
