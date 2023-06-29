import React, { useContext, useState, useEffect } from "react";
import GridWrap from "../../components/reusable-components/GridWrap";
import AvatarImage from "../../components/AvatarImage";
import UserTickets from "../../components/UserTickets";
import Button from "../../components/reusable-components/Button";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { authContext } from "../../contexts/authContext";
import { CustomLink } from "../../styles/Styles";
import { Grid, Typography, Box } from "@mui/material";
import { HiOutlineSwitchHorizontal, HiOutlineLogout } from "react-icons/hi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiFileUploadLine, RiHistoryFill } from "react-icons/ri";
import { GrCycle } from "react-icons/gr";
import { BsWallet2 } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import {
  styleimage,
  typeStyle,
  typeText,
  optionstyle,
} from "../../styles/profile";
import { OptionsProfileButton } from "../../styles/Styles";

const optionProfile = [
  { name: "Edit Profile", icon: <CgProfile /> },
  { name: "Tickets", icon: <RiFileUploadLine /> },
  { name: "Offers", icon: <GrCycle /> },
  { name: "Wallet", icon: <BsWallet2 /> },
  { name: "History", icon: <RiHistoryFill /> },
  { name: "Settings", icon: <FiSettings /> },
];

const Profile = () => {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState({});
  const [userImage, setUserImage] = useState();
  const [showTickets, setShowTickets] = useState("none");
  const auth = useContext(authContext);
  const { isLoading, error, sendRequest } = useHttpRequest();

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else if (hour >= 18 && hour < 23) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      let result;
      try {
        result = await sendRequest(`getUser/${auth.userId}`, "GET");
        setUserName(result.user);

        setUserImage(result.image.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const changeStateUser = () => {
    if (auth.state === "seller") auth.changeState("buyer");
    else auth.changeState("seller");
    setShowTickets("none");
  };

  const handleshowTickets = (name) => {
    if (name === "Tickets") {
      if (auth.state === "seller") setShowTickets("seller");
      if (auth.state === "buyer") setShowTickets("buyer");
    }
  };

  const x = "5% auto 100%";
  const y = "5% auto auto";

  return (
    <GridWrap margin="30px auto auto">
      <AvatarImage styleimage={styleimage} userImage={userImage} />
      <Typography sx={typeStyle}>
        {greeting}, {userName.first_name} {userName.last_name}
      </Typography>
      <Button onClick={changeStateUser} width="32.5%" fontSize="20px">
        You are a {auth.state}{" "}
        <HiOutlineSwitchHorizontal style={{ marginLeft: "7px" }} />
      </Button>
      <Typography color={"#666666"} margin="8px">
        Help <AiOutlineQuestionCircle size={"14px"} />
      </Typography>
      <Grid container width={"100%"} margin={"30px auto"}>
        {optionProfile.map((item, index) => (
          <Grid key={index} item xs={4}>
            <Box sx={optionstyle}>
              <OptionsProfileButton
                onClick={() => handleshowTickets(item.name)}
              >
                <Typography sx={typeText}>{item.name}</Typography>
                {item.icon}
              </OptionsProfileButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {showTickets == "seller" ? (
        <UserTickets showTickets={showTickets} />
      ) : (
        showTickets === "buyer" && <UserTickets showTickets={showTickets} />
      )}

      <CustomLink to={"/"} sx={{ margin: "50px auto 100px" }}>
        <Button
          background="black"
          border="1px solid black"
          onClick={auth.logout}
        >
          Log Out
          <HiOutlineLogout style={{ marginLeft: "5px" }} />
        </Button>
      </CustomLink>
    </GridWrap>
  );
};

export default Profile;
