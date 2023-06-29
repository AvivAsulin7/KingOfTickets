import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import Button from "../../components/reusable-components/Button";
import BackupIcon from "@mui/icons-material/Backup";
import { authContext } from "../../contexts/authContext";
import { actions } from "../../services/actions";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { useForm } from "../../hooks/useForm";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Card, CardContent, Typography, Grid } from "@mui/material";
import {
  IconWrapper,
  StyledLabel,
  StyledInput,
  Message,
  MessageWrapper,
} from "../../styles/Styles";

const Connection = () => {
  const [errorUploadTicket, setErrorUploadTicket] = useState();
  const [isSignIn, setIsSignIn] = useState();
  const [message, setMessage] = useState(null);
  const [fileName, setFileName] = useState(null);
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
    let result, result1;
    try {
      if (isSignIn === "/signin") {
        try {
          result = await sendRequest("auth/jwt/create", "POST", form);
        } catch (err) {
          console.log(err);
          return;
        }

        localStorage.setItem("userToken", result.access);
        result1 = await sendRequest("signIn", "POST", form, {
          "Content-Type": "application/json",
          Authorization: `JWT ${result.access}`,
        });
      } else {
        let formData = new FormData();
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("username", form.username);
        formData.append("firstname", form.firstname);
        formData.append("lastname", form.lastname);
        formData.append("image", form.image);
        result1 = await actions.signUp(formData);
      }

      if (result) {
        auth.login(result1.user.id, result.access);
        navigate(`/role/${result1.user.id}`);
      } else {
        auth.login(result1.user.id);

        navigate(`/role/${result1.user.id}`);
      }
    } catch (error) {
      console.log(error);
      setErrorUploadTicket(error);
    }
  };

  return (
    <MainContainer>
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
                        required
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
                {error ||
                  (errorUploadTicket && (
                    <Typography sx={{ margin: "15px 10px 0", color: "red" }}>
                      {error || errorUploadTicket}
                    </Typography>
                  ))}
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

export default Connection;
