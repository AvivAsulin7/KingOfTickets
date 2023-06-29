import React, { useState, useContext } from "react";
import Button from "../../components/reusable-components/Button";
import Header from "../../components/Header";
import ModalApp from "../../components/reusable-components/ModalApp";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { useForm } from "../../hooks/useForm";
import { useModal } from "../../hooks/useModal";
import { authContext } from "../../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import Cleave from "cleave.js/react";
import anime from "animejs/lib/anime.es.js";
import checked from "../../images/checked.png";
import cancel from "../../images/cancel.png";
import { BiLock } from "react-icons/bi";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
} from "react-icons/fa";
import { textPay, GridPay, container } from "../../styles/payment";
import "./Payment.css";

const Payment = () => {
  const { handleFormChange, form, isValid } = useForm(
    {
      cardNumber: "0000 0000 0000 0000",
      cardHolderName: "",
      cardExpirationDate: "",
      cardCVC: "",
      cardType: "",
    },
    {
      cardNumber: false,
      cardHolderName: false,
      cardExpirationDate: false,
      cardCVC: false,
    }
  );
  const { isLoading, error, sendRequest } = useHttpRequest();
  const [errorUploadTicket, setErrorUploadTicket] = useState();
  const location = useLocation();
  const tickets = location.state.data;
  const price = location.state.totalPrice;
  const [timeOutSecond, settimeOutSecond] = useState(5);
  const auth = useContext(authContext);
  const { open, handleOpen } = useModal();
  const navigate = useNavigate();

  const handleStartClick = () => {
    const interval = setInterval(() => {
      settimeOutSecond((timeOutSecond) => timeOutSecond - 1);
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearInterval(interval);
  };

  // Flip card animations
  const flipCard = () => {
    anime({
      targets: ".credit-card-inner",
      rotateY: "180deg",
      duration: "100",
      easing: "linear",
    });
  };
  const unFlipCard = () => {
    anime({
      targets: ".credit-card-inner",
      rotateY: "360deg",
      duration: "100",
      easing: "linear",
    });
  };

  const buyTicket = async (event) => {
    setErrorUploadTicket();
    handleOpen();
    handleStartClick();
    event.preventDefault();
    try {
      await sendRequest(`buyTickets/${tickets}/${auth.userId}`, "POST");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid sx={container}>
        <Header />
        <div className="container2">
          <div className="credit-card">
            <div className="credit-card-inner">
              <div className="credit-card-front">
                <div id="card-type">
                  {form.cardType === "" && <FaCreditCard />}
                  {form.cardType === "Discover" && <FaCcDiscover />}
                  {form.cardType === "AmericanExpress" && <FaCcAmex />}
                  {form.cardType === "Visa" && <FaCcVisa />}
                  {form.cardType === "DinersClub" && <FaCcDinersClub />}
                  {form.cardType === "JCB" && <FaCcJcb />}
                  {form.cardType === "MasterCard" && <FaCcMastercard />}
                </div>

                <div id="card-number">{form.cardNumber}</div>

                <div id="card-expiration">
                  {form.cardExpirationDate !== "" && (
                    <div id="validthru">Valid Thru</div>
                  )}
                  {form.cardExpirationDate}
                </div>

                <div id="card-holder-name">{form.cardHolderName}</div>
              </div>
              <div className="credit-card-back">
                <div className="card-stripe" />
                <div className="card-sig-container">
                  <div className="signature">{form.cardHolderName}</div>
                  CVC {form.cardCVC}
                  <p className="credits">Security Payment Hotix.</p>
                </div>
              </div>
            </div>
            <form className="card-form">
              <label className="input-label">Credit Card Number</label>
              <Cleave
                placeholder="Enter your credit card number"
                options={{ creditCard: true }}
                id="number-input"
                name="cardNumber"
                className="text-input"
                onChange={handleFormChange}
              />
              <label className="input-label">Card Holder Name</label>
              <input
                name="cardHolderName"
                type="text"
                placeholder="Enter card holder name"
                value={form.cardHolderName}
                onChange={handleFormChange}
                className="text-input"
                maxLength="30"
              />
              <div className="date-and-csv" style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <label className="input-label">Expiration Date</label>
                  <Cleave
                    options={{
                      date: "true",
                      delimiter: "/",
                      datePattern: ["m", "y"],
                    }}
                    name="cardExpirationDate"
                    placeholder="Enter expiration date"
                    value={form.cardExpirationDate}
                    className="text-input"
                    onChange={handleFormChange}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <label className="input-label">CVC Security Code</label>
                  <Cleave
                    options={{
                      numeral: "true",
                    }}
                    placeholder="Enter CVC"
                    maxLength="3"
                    name="cardCVC"
                    value={form.cardCVC}
                    className="text-input"
                    onChange={handleFormChange}
                    onFocus={flipCard}
                    onBlur={unFlipCard}
                  />
                </div>
              </div>
              <Grid sx={GridPay}>
                <Typography sx={textPay} variant={"h5"}>
                  {auth.state === "buyer"
                    ? "Your Payment :"
                    : "Your Card deposit :"}
                </Typography>
                <Typography sx={textPay} variant={"h4"}>
                  {price}$
                </Typography>
              </Grid>
              <Button
                margin="auto auto 100px"
                disabled={isValid}
                onClick={buyTicket}
              >
                Pay Secure
                <BiLock style={{ marginLeft: "5px" }} />
              </Button>

              <ModalApp open={open}>
                <>
                  <img
                    alt="cancel-img"
                    src={error ? cancel : checked}
                    className="img_pay"
                  ></img>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    fontWeight="bold"
                    textTransform="none"
                  >
                    {error ? "Pay Attention" : "Thank you!"}
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    {error
                      ? errorUploadTicket
                      : "Payment Process is done successfully"}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    You will return to home page in : {timeOutSecond}{" "}
                    {timeOutSecond === 1 ? "second" : "seconds"}
                  </Typography>
                </>
              </ModalApp>
            </form>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default Payment;
