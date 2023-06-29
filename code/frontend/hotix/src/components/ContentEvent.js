import React from "react";
import { CardContent, Typography } from "@mui/material";

const ContentEvent = ({ event }) => {
  function formatDate(inputDate) {
    const parts = inputDate.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }
  function formatTime(inputDate) {
    const parts = inputDate.split(":");
    return parts[0] + ":" + parts[1];
  }
  return (
    <CardContent>
      <Typography
        gutterBottom
        component="div"
        sx={{ fontSize: { xs: "h8", sm: "h5" } }}
      >
        {event.event_name}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "0.7rem", sm: "1rem" },
          textTransform: "capitalize",
        }}
      >
        {event.location}, {formatDate(event.date)}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "0.7rem", sm: "1rem" },
          textTransform: "capitalize",
        }}
      >
        {formatTime(event.time)}
      </Typography>
    </CardContent>
  );
};

export default ContentEvent;
