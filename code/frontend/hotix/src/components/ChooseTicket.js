import React, { useContext } from "react";
import Button from "./reusable-components/Button";
import ModalApp from "./reusable-components/ModalApp";
import { CustomLink } from "../styles/Styles";
import { useModal } from "../hooks/useModal";
import { authContext } from "../contexts/authContext";
import { Stack, Typography, useMediaQuery } from "@mui/material";

const ChooseTicket = ({ item }) => {
  const { open, handleClose, handleOpen } = useModal();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const auth = useContext(authContext);

  const data = {
    type: item.type,
    row: item.row,
    seat: item.seat,
    age: item.age,
    price: item.price,
  };

  return (
    <Stack
      direction="row" // Set the direction to column on small screens
      display="flex"
      justifyContent="space-between"
      alignItems={isSmallScreen ? "flex-start" : "center"} // Align items to flex-start on small screens
      width="100%"
      padding={{ xs: "0 10px", md: "0" }}
      marginTop={isSmallScreen ? "20px" : "0"} // Add some margin on small screens to prevent overlapping
    >
      {Object.entries(data).map(([key, value]) => (
        <Stack
          key={key}
          margin={isSmallScreen ? "10px 0" : "10px"} // Adjust margin on small screens
          width={isSmallScreen ? "100%" : "5rem"} // Set width to 100% on small screens
          padding={isSmallScreen ? "0 10px" : "0 5px"} // Adjust padding on small screens
        >
          <Typography fontWeight="bold" width="100%">
            {key}
          </Typography>
          <Typography width="100%">
            {" "}
            {key === "price" ? `${value}$` : `${value}`}
          </Typography>
        </Stack>
      ))}
      {auth.token ? (
        <CustomLink
          to={"/payment"}
          state={{ data: item.id, totalPrice: item.price }}
        >
          <Button fontSize={isSmallScreen ? "12px" : "15px"}>Buy</Button>
        </CustomLink>
      ) : (
        <>
          <Button
            width="auto"
            fontSize={isSmallScreen ? "12px" : "15px"}
            onClick={handleOpen}
          >
            Buy
          </Button>
          <ModalApp handleClose={handleClose} open={open}>
            <>
              <Typography
                id="transition-modal-title"
                variant="h6"
                fontWeight="bold"
              >
                Hello Guest
              </Typography>
              <Typography
                id="transition-modal-description"
                textTransform="none"
                sx={{ mt: 2 }}
              >
                If you want to buy or sell a ticket, please log in.
              </Typography>
              <CustomLink to={"/login"}>
                <Button width="40%">Login</Button>
              </CustomLink>
            </>
          </ModalApp>
        </>
      )}
    </Stack>
  );
};

export default ChooseTicket;
