import React, { useEffect, useState } from "react";
import { modifyMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/ResultModal";
import { useRecoilState } from "recoil";
import { signinState } from "../../atoms/signinState";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";

const initState = {
  email: "",
  pw: "",
  nickname: "",
};

const ModifyComponent = () => {
  const [member, setMember] = useState(initState);
  const [loginInfo, setLoginInfo] = useRecoilState(signinState);
  const { moveToPath } = useCustomLogin();
  const [result, setResult] = useState();

  useEffect(() => {
    setMember({ ...loginInfo, pw: "ABCD" });
  }, [loginInfo]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleClickModify = () => {
    modifyMember(member).then(() => {
      setResult("Modified");
    });
  };

  const closeModal = () => {
    setResult(null);
    moveToPath("/");
  };

  return (
    <Container maxWidth="sm"
    >
      {result && (
        <ResultModal
          callbackFn={closeModal}
          title="회원정보 수정"
          content="정보 수정 완료"
        />
      )}

      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          회원정보 수정
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={member.email}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="pw"
                type="password"
                variant="outlined"
                value={member.pw}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nickname"
                name="nickname"
                variant="outlined"
                value={member.nickname}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "1rem", p: 1.5 }}
                onClick={handleClickModify}
              >
                Modify
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ModifyComponent;
