import React, { useEffect, useContext, useState } from "react";
import StatusTickets from "./reusable-components/StatusTickets";
import { useHttpRequest } from "../hooks/useHttpRequest";
import { authContext } from "../contexts/authContext";
import { Typography } from "@mui/material";
import { ticketsTypography } from "../styles/profile";

const UserTickets = ({ showTickets }) => {
  const { isLoading, error, sendRequest } = useHttpRequest();
  const [tickets, setTickets] = useState();
  const auth = useContext(authContext);
  useEffect(() => {
    const fetchUserTickets = async () => {
      let result;
      try {
        result = await sendRequest(
          `getTickets/${auth.userId}/${showTickets}`,
          "GET"
        );
        setTickets(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTickets();
  }, []);
  return (
    <>
      {!tickets ? (
        <Typography sx={ticketsTypography}>{error}</Typography>
      ) : (
        <>
          <Typography sx={ticketsTypography}>
            {showTickets == "seller"
              ? "Your sales tickets"
              : "Your purchase tickets"}
          </Typography>
          <StatusTickets showTickets={showTickets} tickets={tickets} />
        </>
      )}
    </>
  );
};

export default UserTickets;
