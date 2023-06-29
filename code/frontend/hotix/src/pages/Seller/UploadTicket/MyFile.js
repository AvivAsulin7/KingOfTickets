import React, { useState, useContext, useEffect } from "react";
import Button from "../../../components/reusable-components/Button";
import Divider from "@mui/material/Divider";
import FileUpload from "../../../components/FileUpload";
import { Typography, Stack, TextField, Grid } from "@mui/material";
import {
  InputSeat,
  TypographyForm,
  LabelTextField,
} from "../../../styles/upload-ticket";

const MyFile = ({ handleChangeTextField, index, item }) => {
  const [isActiveType, SetIsActiveType] = useState("");
  const [price, SetPrice] = useState();
  const [isActiveAge, SetIsActiveAge] = useState("");

  return (
    <Grid width="100%">
      <Typography sx={TypographyForm}>Ticket seat:</Typography>

      <Stack direction="row" justifyContent="center">
        <TextField
          onChange={(e) => handleChangeTextField(index, e)}
          label="Area"
          variant="outlined"
          size="small"
          type="text"
          name="area"
          value={item.area}
          InputLabelProps={LabelTextField}
          sx={InputSeat}
        />
        <TextField
          onChange={(e) => handleChangeTextField(index, e)}
          label="Seat"
          variant="outlined"
          name="seat"
          type="number"
          value={item.seat}
          size="small"
          InputLabelProps={LabelTextField}
          sx={InputSeat}
        />
        <TextField
          onChange={(e) => handleChangeTextField(index, e)}
          label="Row"
          variant="outlined"
          value={item.row}
          name="row"
          type="number"
          size="small"
          InputLabelProps={LabelTextField}
          sx={InputSeat}
        />
      </Stack>
      <Typography sx={TypographyForm}>Ticket Type:</Typography>
      <Stack direction="row" justifyContent="center">
        <Button
          onClick={(e) => {
            SetIsActiveType("regular");
            handleChangeTextField(index, e);
          }}
          background={isActiveType === "regular" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveType === "regular" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="Regular"
          name="type"
        >
          Regular
        </Button>
        <Button
          onClick={(e) => {
            SetIsActiveType("vip");
            handleChangeTextField(index, e);
          }}
          background={isActiveType === "vip" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveType === "vip" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="Vip"
          name="type"
        >
          VIP
        </Button>
        <Button
          onClick={(e) => {
            SetIsActiveType("student");
            handleChangeTextField(index, e);
          }}
          background={isActiveType === "student" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveType === "student" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="Student"
          name="type"
        >
          Student
        </Button>
      </Stack>

      <Typography sx={TypographyForm}>Age restriction:</Typography>
      <Stack direction="row" justifyContent="center">
        <Button
          onClick={(e) => {
            SetIsActiveAge("16+");
            handleChangeTextField(index, e);
          }}
          background={isActiveAge === "16+" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveAge === "16+" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="16+"
          name="age"
        >
          16+
        </Button>
        <Button
          onClick={(e) => {
            SetIsActiveAge("18+");
            handleChangeTextField(index, e);
          }}
          background={isActiveAge === "18+" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveAge === "18+" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="18+"
          name="age"
        >
          18+
        </Button>
        <Button
          onClick={(e) => {
            SetIsActiveAge("21+");
            handleChangeTextField(index, e);
          }}
          background={isActiveAge === "21+" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveAge === "21+" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="21+"
          name="age"
        >
          21+
        </Button>
        <Button
          onClick={(e) => {
            SetIsActiveAge("no limit");
            handleChangeTextField(index, e);
          }}
          background={isActiveAge === "no limit" ? "rgb(55, 48, 107)" : "#fff"}
          color={isActiveAge === "no limit" ? "#fff" : "black"}
          border="1px solid black"
          margin="10px"
          value="No limit"
          name="age"
        >
          No limit
        </Button>
      </Stack>
      <Typography sx={TypographyForm}>Price:</Typography>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <TextField
          onChange={(e) => {
            handleChangeTextField(index, e);
            SetPrice(e.target.value);
          }}
          label="Ticket Price"
          variant="outlined"
          value={item.price}
          name="price"
          size="small"
          type="number"
          InputLabelProps={LabelTextField}
          sx={{ width: "100px", marginTop: "17px" }}
        />{" "}
        <Typography variant="h5" alignSelf="end" marginLeft="10px">
          $
        </Typography>
      </Stack>
      <FileUpload handleChangeTextField={handleChangeTextField} index={index} />

      <Divider variant="middle" sx={{ margin: "30px" }} />
    </Grid>
  );
};

export default MyFile;
