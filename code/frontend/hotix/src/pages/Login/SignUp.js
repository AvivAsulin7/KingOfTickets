import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import MainContainer from "../../components/MainContainer";
import Button from "../../components/reusable-components/Button";
import { authContext } from "../../contexts/authContext";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { useForm } from "../../hooks/useForm";
import { useModal } from "../../hooks/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import {
  IconWrapper,
  StyledLabel,
  Message,
  MessageWrapper,
} from "../../styles/Styles";
import axios from "axios";

const SignUp = () => {
  const [errorUploadTicket, setErrorUploadTicket] = useState();
  const [isSignIn, setIsSignIn] = useState();
  const [message, setMessage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [imageUpload, setImageUpload] = useState();
  const { open, setOpen, handleClose, handleOpen } = useModal();
  const { isLoading, error, sendRequest } = useHttpRequest();

  const { handleFormChange, form } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  let location = useLocation();
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Do something with the uploaded file...
    setFileName(file.name);
    setMessage("Image uploaded!");
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    // Do something with the dropped file...
    setFileName(file.name);
    setMessage("Image uploaded!");
  };

  useEffect(() => {
    setIsSignIn(location.pathname);
  }, []);

  const handleSumbit = async (event) => {
    event.preventDefault();
    let result1;
    try {
      if (!fileName) setErrorUploadTicket("Please upload an image");
      else {
        let image = new FormData();
        image.append("file", form.image);
        image.append("upload_preset", "zfo7tgdg");
        const result = await axios.post(
          "https://api.cloudinary.com/v1_1/dfbnsaoho/image/upload",
          image
        );
        setImageUpload(result.data.secure_url);

        const newUser = {
          email: form.email,
          password: form.password,
          username: form.username,
          firstname: form.firstname,
          lastname: form.lastname,
          image: result.data.secure_url,
        };

        result1 = await sendRequest("signUp", "POST", newUser);

        navigate(`/signin`);
      }
    } catch (error) {
      console.log(error);
      setErrorUploadTicket(error);
    }
  };

  return (
    <MainContainer>
      {isLoading && <Loading />}
      <Header />
      <Grid marginTop="70px">
        <Card style={{ maxWidth: 450 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {isSignIn === "/signin" ? "Sign in" : "Sign up"}
            </Typography>
            <form onSubmit={handleSumbit} autoComplete="off" method="post">
              <Grid
                container
                spacing={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isSignIn === "/signup" && (
                  <>
                    <Grid xs={12} item>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleFormChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Last Name"
                        value={form.lastname}
                        variant="outlined"
                        name="lastname"
                        onChange={handleFormChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={form.email}
                        name="email"
                        onChange={handleFormChange}
                        fullWidth
                        required
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    value={form.username}
                    name="username"
                    autoComplete="off"
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={form.password}
                    name="password"
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                {isSignIn === "/signup" && (
                  <Grid item xs={12} justifyContent="center" display="flex">
                    <StyledLabel
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        hidden
                        id="12"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileUpload(e);
                          handleFormChange(e);
                        }}
                      />

                      {fileName ? (
                        <MessageWrapper>
                          <Typography variant="subtitle1">
                            {fileName}
                          </Typography>
                          {message && <Message>{message}</Message>}
                        </MessageWrapper>
                      ) : (
                        <>
                          <IconWrapper>
                            <BackupIcon fontSize="large" />
                          </IconWrapper>
                          <Typography variant="h8" component="span">
                            Drag and drop image, or click to browse
                          </Typography>
                        </>
                      )}
                    </StyledLabel>
                  </Grid>
                )}
                <Box margin="30px 10px 0" color={"red"}>
                  {error ||
                    (errorUploadTicket && (
                      <Typography>{error || errorUploadTicket}</Typography>
                    ))}
                </Box>
                <Grid item xs={12} marginTop="20px">
                  <Button type="sumbit">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </MainContainer>
  );
};

export default SignUp;
