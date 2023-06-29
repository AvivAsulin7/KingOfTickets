import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import ContentEvent from "../../../components/ContentEvent";
import ModalApp from "../../../components/reusable-components/ModalApp";
import ContentSellTicket from "../../../components/ContentSellTicket";
import Button from "../../../components/reusable-components/Button";
import { useModal } from "../../../hooks/useModal";
import { authContext } from "../../../contexts/authContext";
import { Typography, Box, Stack, useMediaQuery, Divider } from "@mui/material";
import { actions } from "../../../services/actions";
import checked from "../../../images/checked.png";
import cancel from "../../../images/cancel.png";

const SellSummary = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [timeOutSecond, settimeOutSecond] = useState(5);
  const [errorUploadTicket, setErrorUploadTicket] = useState();
  const { open, handleOpen } = useModal();
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const location = useLocation();
  const tickets = location.state.data;
  const event = location.state.detailsEvent;

  const handleStartClick = () => {
    const interval = setInterval(() => {
      settimeOutSecond((timeOutSecond) => timeOutSecond - 1);
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearInterval(interval);
  };

  const sellTicket = async () => {
    setErrorUploadTicket();
    handleOpen();
    handleStartClick();
    try {
      await Promise.all(
        tickets.map(async (ticket) => {
          let formData = new FormData();
          formData.append("age", ticket.age);
          formData.append("price", ticket.price);
          formData.append("row", ticket.row);
          formData.append("seat", ticket.seat);
          formData.append("area", ticket.area);
          formData.append("type", ticket.type);
          formData.append("pdf_file", ticket.pdf_file);
          formData.append("id_owner", ticket.id_owner);
          formData.append("id_event", ticket.id_event);
          await actions.uploadTickets(formData, auth.token);
        })
      );
    } catch (error) {
      console.log(error);
      setErrorUploadTicket(error);
    }
  };

  return (
    <>
      <Header />
      <Box textAlign="center">
        <ContentEvent event={event}></ContentEvent>
      </Box>
      <Typography variant="h3" marginBottom="40px">
        Summary:{" "}
      </Typography>
      {tickets.map((item, index) => (
        <Stack key={index} width={isSmallScreen ? "95%" : "85%"}>
          <Stack
            backgroundColor="#11111111"
            direction="row"
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <ContentSellTicket item={item} />
          </Stack>
          <Divider />
        </Stack>
      ))}
      <Button width="auto" margin="30px auto 100px" onClick={sellTicket}>
        <Typography>Upload Tickets to sell</Typography>
      </Button>
      <ModalApp open={open}>
        <>
          <img
            alt="cancel-img"
            src={errorUploadTicket ? cancel : checked}
            className="img_pay"
          ></img>
          <Typography
            id="transition-modal-title"
            variant="h6"
            fontWeight="bold"
            textTransform="none"
          >
            {errorUploadTicket ? "Pay Attention" : "Thank you!"}
          </Typography>

          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {errorUploadTicket
              ? errorUploadTicket
              : "Payment Process is done successfully"}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            You will return to home page in : {timeOutSecond}{" "}
            {timeOutSecond === 1 ? "second" : "seconds"}
          </Typography>
        </>
      </ModalApp>
    </>
  );
};

export default SellSummary;
