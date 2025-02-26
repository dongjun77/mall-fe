import React from "react";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { Button, Typography, Box } from "@mui/material";

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
      <Button
        href={link}
        variant="contained"
        sx={{
          bgcolor: "#FEE500", // 카카오 노란색
          color: "#000000",
          fontWeight: "bold",
          fontSize: "1.2rem",
          width: "50%",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          "&:hover": { bgcolor: "#FDD835" }, // hover 시 색상 변경
        }}
      >
        KAKAO LOGIN
      </Button>
      <Typography
        variant="body1"
        color="primary"
        textAlign="center"
        gutterBottom
      >
        로그인 시 자동 가입 처리됩니다
      </Typography>
    </Box>
  );
};

export default KakaoLoginComponent;
