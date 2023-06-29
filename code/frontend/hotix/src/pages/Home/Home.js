import React, { useContext, useEffect, useState } from "react";
import Event from "../../components/Event";
import Button from "../../components/reusable-components/Button";
import Search from "../../components/Search";
import Carousel from "../../components/Carousel";
import { CustomLink } from "../../styles/Styles";
import { useForm } from "../../hooks/useForm";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { authContext } from "../../contexts/authContext";
import { Grid, Box, Typography, Stack } from "@mui/material";
import "./Home.css";
import {
  searchBoxStyle,
  backgroundCrowd,
  dicscover_style,
  upcoming_style,
  searchBox,
  GridFilterEventStyle,
  typoStyle,
} from "../../styles/home";

const Home = () => {
  const [options, setOptions] = useState({ cities: [], names: [] });
  const [events, setEvents] = useState([]);
  const { error, sendRequest } = useHttpRequest();
  const [showUpcoming, setShowUpcoming] = useState(true);
  const auth = useContext(authContext);

  const { handleFormChange, form, isValid } = useForm();

  useEffect(() => {
    const getSearchOptions = async () => {
      let result;
      try {
        result = await sendRequest("getEventsInfo", "GET");
        setOptions({
          cities: result.cities,
          names: result.names,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getEvents = async () => {
      let result;
      try {
        result = await sendRequest("UpcomingEvents", "GET");
        setEvents(result);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchOptions();
    getEvents();
  }, []);

  const handleEventsByCategory = async (choose) => {
    let result;
    try {
      result = await sendRequest(`getEvents/${choose}`, "GET");
      setEvents(result);
      setShowUpcoming(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    let result;
    try {
      result = await sendRequest("search", "POST", form);
      setEvents(result);
      setShowUpcoming(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={backgroundCrowd}></Box>
      <Stack direction="column" sx={searchBox}>
        <Box sx={searchBoxStyle}>
          <Search
            options={options.names}
            title="Event"
            handleFormChange={handleFormChange}
          />
          <Search
            options={options.cities}
            title="City"
            handleFormChange={handleFormChange}
          />
          <Search title="Date" handleFormChange={handleFormChange} />
        </Box>
        <Button onClick={() => handleSearch()} disabled={isValid} width="170px">
          Search
        </Button>
      </Stack>
      <Stack sx={dicscover_style} direction="column">
        {!auth.token && (
          <CustomLink to={"/login"}>
            <Button fontSize="20px">Join Us</Button>
          </CustomLink>
        )}

        <Typography sx={typoStyle}>Discover New Events</Typography>
      </Stack>

      <Carousel
        handleEventsByCategory={handleEventsByCategory}
        setShowUpcoming={setShowUpcoming}
      />

      {error ? (
        <Box marginBottom={"100px"}>
          <Typography sx={upcoming_style}>{error}</Typography>
        </Box>
      ) : (
        <>
          {" "}
          <Typography sx={upcoming_style}>
            {showUpcoming ? "Upcoming Events" : "Events"}
          </Typography>
          <Grid container sx={GridFilterEventStyle}>
            {events.map((event, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Event event={event} key={index} />
              </Grid>
            ))}
          </Grid>{" "}
        </>
      )}
    </>
  );
};

export default Home;
