import { useEffect, useCallback, useState } from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import BuyerTicket from "../src/pages/Buyer/BuyerTicket/BuyerTicket";
import Login from "../src/pages/Login/Login";
import Payment from "../src/pages/Payment/Payment";
import Profile from "../src/pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SelectRole from "../src/pages/SelectRole/SelectRole";
import UploadTicket from "../src/pages/Seller/UploadTicket/UploadTicket";
import Connection from "./pages/Login/Connection";
import SignUp from "./pages/Login/SignUp";
import { authContext } from "./contexts/authContext";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";

import "./App.css";
import MainContainer from "./components/MainContainer";
import SellSummary from "./pages/Seller/UploadTicket/SellSummary";

function App() {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState(false);
  const [state, setState] = useState("seller");

  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    if (token) {
      setToken(token);
    }

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
  }, []);

  const changeState = useCallback((choose) => {
    setState(choose);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const userToken = localStorage.getItem("userToken");
    if (data && userToken && new Date(data.expiration) > new Date()) {
      login(data.userId, userToken, new Date(data.expiration));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <authContext.Provider
        value={{ userId, login, logout, state, changeState, token }}
      >
        <HashRouter>
          <MainContainer>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/chooseTicket/:eid"
                element={<BuyerTicket />}
              ></Route>
              {token ? (
                <>
                  <Route path="/role/:id" element={<SelectRole />}></Route>
                  <Route path="/payment" element={<Payment />}></Route>
                  <Route path="/summary" element={<SellSummary />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route
                    path="/uploadTicket/:eid"
                    element={<UploadTicket />}
                  ></Route>
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<SignUp />}></Route>
                  <Route path="/signin" element={<Connection />}></Route>
                </>
              )}
            </Routes>
            {token && <Navbar />}
          </MainContainer>
        </HashRouter>
      </authContext.Provider>
    </ThemeProvider>
  );
}

export default App;
