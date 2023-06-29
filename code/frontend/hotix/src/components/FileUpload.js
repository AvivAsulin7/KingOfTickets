import React, { useRef, useEffect, useState } from "react";
import Button from "./reusable-components/Button";
import { Grid } from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";

const FileUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const fileUploadRef = useRef();

  useEffect(() => {
    if (props.InitialValue) setPreviewUrl(props.InitialValue);
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    setFile(event.target.files[0]);
    props.handleChangeTextField(props.index, event);
  };

  const pickFileHandler = () => {
    fileUploadRef.current.click(); // open up the file picker
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "20px",
        justifyContent: "space-around",
        width: "auto",
      }}
    >
      <input
        id={props.id}
        ref={fileUploadRef}
        style={{ display: "none" }}
        type="file"
        accept=".pdf"
        onChange={pickedHandler}
        name="pdf_file"
      />

      {previewUrl && (
        <Grid display="flex" alignItems="center">
          <p>Your PDF is upload </p>
          <AiOutlineCheckCircle
            color="green"
            size={"30px"}
            style={{ marginLeft: "5px" }}
          />
        </Grid>
      )}
      {!previewUrl && <p>Upload only PDF file</p>}

      <Button onClick={pickFileHandler} width="auto" fontSize="1rem">
        Finish? Upload your ticket
      </Button>
    </Grid>
  );
};

export default FileUpload;
