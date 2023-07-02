import { useContext } from "react";
import ContentEvent from "./ContentEvent";
import Button from "./reusable-components/Button";
import { cardStyle, CustomLink } from "../styles/Styles";
import { authContext } from "../contexts/authContext";
import { Card, CardMedia, Box } from "@mui/material";
import { imageStyle } from "../styles/Styles";

const Event = ({ event }) => {
  const auth = useContext(authContext);

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={imageStyle} image={event.image} title="picture" />
      <ContentEvent event={event} />

      <Box>
        {auth.token ? (
          auth.userId ? (
            auth.state === "seller" ? (
              <CustomLink to={`/uploadTicket/${event.id}`}>
                <Button width="90%">Sell</Button>
              </CustomLink>
            ) : (
              <CustomLink to={`/chooseTicket/${event.id}`}>
                <Button width="90%">Buy</Button>
              </CustomLink>
            )
          ) : null
        ) : (
          <CustomLink to={`/chooseTicket/${event.id}`}>
            <Button width="90%">View</Button>
          </CustomLink>
        )}
      </Box>
    </Card>
  );
};

export default Event;
