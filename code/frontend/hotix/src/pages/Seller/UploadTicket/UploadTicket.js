import React, { useEffect, useState, useContext } from "react";
import Header from "../../../components/Header";
import GridWrap from "../../../components/reusable-components/GridWrap";
import Button from "../../../components/reusable-components/Button";
import ContentEvent from "../../../components/ContentEvent";
import CountTickets from "../../../components/CountTickets";
import ModalApp from "../../../components/reusable-components/ModalApp";
import MyFile from "./MyFile";
import { useHttpRequest } from "../../../hooks/useHttpRequest";
import { useModal } from "../../../hooks/useModal";
import { authContext } from "../../../contexts/authContext";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Grid, Box, useMediaQuery } from "@mui/material";
import { actions } from "../../../services/actions";
import cancel from "../../../images/cancel.png";
import { GridFormTickets } from "../../../styles/upload-ticket";
import { createFormData } from "../../../utils/createFormData";

const UploadTicket = () => {
  const { sendRequest } = useHttpRequest();
  const [detailsEvent, setDetailsEvent] = useState();
  const auth = useContext(authContext);
  const { eid } = useParams();
  const [formValues, setFormValues] = useState([
    {
      id_owner: auth.userId,
      id_event: eid,
      age: "",
      area: "",
      pdf_file: "",
      price: "",
      row: "",
      seat: "",
      type: "",
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { open, handleClose, handleOpen } = useModal();
  const [openError, setOpenError] = useState(false);
  const handleCloseError = () => setOpenError(false);
  const handleOpenError = () => setOpenError(true);

  const [errorDetails, setErrorDetails] = useState();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

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
    getEvent();
  }, []);

  const handleChangeTextField = (i, e) => {
    let newFormValues = [...formValues];
    if (!e.target.files) newFormValues[i][e.target.name] = e.target.value;
    else newFormValues[i][e.target.name] = e.target.files[0];
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        id_owner: auth.userId,
        id_event: eid,
        age: "",
        area: "",
        pdf_file: "",
        price: "",
        row: "",
        seat: "",
        type: "",
      },
    ]);
  };

  const removeFormFields = (i) => {
    if (formValues.length > 1) {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues);
    }
  };

  const calculatePrice = () => {
    const prices = formValues.map((form) => Number(form.price));
    setTotalPrice(prices ? prices.reduce((acc, curr) => acc + curr) : 0);
  };

  const checkValidDeatils = async () => {
    setErrorDetails();
    try {
      await Promise.all(
        formValues.map(async (ticket) => {
          let formData = createFormData(ticket);
          await actions.checkTicketsDetails(formData, auth.token);
        })
      );
      navigate("/summary", {
        state: { data: formValues, totalPrice: totalPrice, detailsEvent },
      });
    } catch (error) {
      console.log(error);
      handleOpenError();
      setErrorDetails(error);
    }
  };

  return (
    <GridWrap margin="0 0 50px">
      <Header />
      <Grid sx={GridFormTickets}>
        {detailsEvent && (
          <>
            <Grid m="20px auto 30px">
              <ContentEvent event={detailsEvent} />
              <Box>
                <img
                  onClick={!isSmallScreen ? handleOpen : undefined}
                  src={detailsEvent.image_map_event}
                  style={{ height: "350px", width: "400px", cursor: "pointer" }}
                  alt="map-img"
                ></img>
              </Box>
            </Grid>
            <ModalApp handleClose={handleClose} open={open}>
              {" "}
              <img
                onClick={handleOpen}
                src={detailsEvent.image_map_event}
                style={{ height: "100%", width: "100%", cursor: "pointer" }}
                alt="map-img"
              ></img>
            </ModalApp>
          </>
        )}
        <CountTickets
          addFormFields={addFormFields}
          removeFormFields={removeFormFields}
        />
      </Grid>

      {formValues.map((item, index) => (
        <MyFile
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          calculatePrice={calculatePrice}
          handleChangeTextField={handleChangeTextField}
          item={item}
          index={index}
          key={index}
        />
      ))}
      <Typography variant="h5" marginRight="10px">
        Total Price: {totalPrice}$
      </Typography>
      <Button width="auto" onClick={calculatePrice}>
        Calculate
      </Button>

      <Button
        width="auto"
        margin="20px 0 40px"
        onClick={checkValidDeatils}
        to={"/payment"}
        state={{ data: formValues, totalPrice: totalPrice }}
      >
        I'm Ready To Sell !
      </Button>

      <ModalApp handleClose={handleCloseError} open={openError}>
        {" "}
        <>
          <img
            onClick={handleOpenError}
            alt="cancel-img"
            src={cancel}
            className="img_pay"
          ></img>
          <Typography
            id="transition-modal-title"
            variant="h6"
            fontWeight="bold"
          >
            Pay Attention
          </Typography>

          <Typography
            id="transition-modal-description"
            textTransform="none"
            sx={{ mt: 2 }}
          >
            {errorDetails}
          </Typography>
        </>
      </ModalApp>
    </GridWrap>
  );
};

export default UploadTicket;
