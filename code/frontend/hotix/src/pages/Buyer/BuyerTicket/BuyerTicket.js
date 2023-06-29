import React, { useContext, useEffect, useState } from "react";
import GridWrap from "../../../components/reusable-components/GridWrap";
import Header from "../../../components/Header";
import ChooseTicket from "../../../components/ChooseTicket";
import ContentEvent from "../../../components/ContentEvent";
import ModalApp from "../../../components/reusable-components/ModalApp";
import { useHttpRequest } from "../../../hooks/useHttpRequest";
import { useModal } from "../../../hooks/useModal";
import { useParams } from "react-router-dom";
import { Typography, Grid, Box, useMediaQuery } from "@mui/material";
import { upcoming_style } from "../../../styles/home";

const BuyerTicket = () => {
  const { error, sendRequest } = useHttpRequest();
  const { open, handleClose, handleOpen } = useModal();
  const [detailsTicket, setDetailsTicket] = useState([]);
  const [detailsEvent, setDetailsEvent] = useState();
  const { eid } = useParams();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const getEvent = async () => {
      let result;
      try {
        result = await sendRequest(`getEvent/${eid}`, "GET");
        setDetailsEvent(result);
      } catch (error) {
        console.log(error);
      }
    };
    const getTickets = async () => {
      let result;
      try {
        result = await sendRequest(`getTicket/${eid}`, "GET");

        setDetailsTicket(result);
      } catch (error) {
        console.log(error);
      }
    };
    getEvent();
    getTickets();
  }, []);

  return (
    <GridWrap margin="auto auto 20%">
      <Header />
      {detailsEvent && (
        <>
          <Grid m="20px auto 30px">
            <ContentEvent event={detailsEvent} />
            <Box>
              <img
                onClick={!isSmallScreen ? handleOpen : undefined}
                src={detailsEvent.image_map_event}
                style={{ height: "350px", width: "400px", cursor: "pointer" }}
              ></img>
            </Box>
          </Grid>
          <ModalApp handleClose={handleClose} open={open}>
            {" "}
            <img
              onClick={handleOpen}
              src={detailsEvent.image_map_event}
              style={{ height: "100%", width: "100%", cursor: "pointer" }}
            ></img>
          </ModalApp>
        </>
      )}

      <Grid sx={{ background: "black", width: "100%" }}>
        <Typography color="white" fontSize="30px">
          Available tickets
        </Typography>
      </Grid>
      {detailsTicket.map((item, index) => (
        <ChooseTicket key={index} item={item}></ChooseTicket>
      ))}
      {error && <Typography sx={upcoming_style}>{error}</Typography>}
    </GridWrap>
  );
};

export default BuyerTicket;
