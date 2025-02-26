import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
  };

  const handleClickLogin = () => {
    doLogin(loginParam).then((data) => {
      if (data.error) {
        alert("이메일과 패스워드를 확인해 주세요");
      } else {
        moveToPath("/");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            value={loginParam.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="pw"
            type="password"
            variant="outlined"
            value={loginParam.pw}
            onChange={handleChange}
            margin="normal"
          />

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickLogin}
              sx={{ width: "50%", fontSize: "1.2rem", p: 1 }}
            >
              LOGIN
            </Button>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <KakaoLoginComponent />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginComponent;
