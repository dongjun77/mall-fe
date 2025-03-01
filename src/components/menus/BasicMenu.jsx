import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {
  const { loginState } = useCustomLogin();

  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 왼쪽 네비게이션 메뉴 */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            Main
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/about"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            About
          </Typography>

          {loginState.email && (
            <>
              <Typography
                variant="h6"
                component={Link}
                to="/todo"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Todo
              </Typography>
              <Typography
                variant="h6"
                component={Link}
                to="/products"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Products
              </Typography>
            </>
          )}
        </Box>

        {/* 로그인/로그아웃 버튼 */}
        <Box>
          {!loginState.email ? (
            <Button
              component={Link}
              to="/member/login"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          ) : (
            <Button
              component={Link}
              to="/member/logout"
              variant="contained"
              color="error"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BasicMenu;
