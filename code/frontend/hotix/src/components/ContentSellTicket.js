import React from "react";
import { Typography, Box } from "@mui/material";

const ContentSellTicket = ({ item }) => {
  const data = {
    type: item.type,
    age: item.age,
    row: item.row,
    seat: item.seat,
    price: item.price,
  };
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <Box padding="10px" textAlign="center">
          <Typography fontWeight="bold">{key}</Typography>
          <Typography>{key === "price" ? `${value}$` : `${value}`}</Typography>
        </Box>
      ))}
    </>
  );
};

export default ContentSellTicket;
