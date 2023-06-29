import React, { useState } from "react";
import { Autocomplete, TextField, Typography, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { parse } from "date-fns";
import {
  autocomplete_style,
  typography_autoComplete,
  grid_search,
} from "../styles/search";

const Search = ({ options, title, handleFormChange }) => {
  const [select, setSelect] = useState(null);

  const handleInputChange = (event) => {
    const inputDateString = event.target.value;
    const parsedDate = parse(inputDateString, "MM/dd/yyyy", new Date());
    if (!isNaN(parsedDate.getTime())) {
      setSelect(parsedDate);
    } else {
      setSelect(null);
    }
  };

  return (
    <Grid sx={grid_search}>
      <Typography sx={typography_autoComplete}>{title}</Typography>
      {title === "Date" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={select}
            onChange={(newValue, event) => {
              setSelect(newValue);
              handleFormChange(event, newValue, title);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="DD-MM-YYYY"
            format="DD-MM-YYYY"
            mask="_//_"
            disableMaskedInput
            onInputChange={handleInputChange}
          />
        </LocalizationProvider>
      ) : (
        <Autocomplete
          value={select}
          onChange={(event, newValue) => {
            setSelect(newValue);
            handleFormChange(event, newValue, title);
          }}
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={autocomplete_style}
          renderInput={(params) => <TextField {...params} label={title} />}
        />
      )}
    </Grid>
  );
};

export default Search;
