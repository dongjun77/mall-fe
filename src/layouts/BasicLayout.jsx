import { Container, Grid, Paper, Typography } from "@mui/material";
import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/menus/CartComponent";

function BasicLayout({ children }) {
  return (
    <>
      <BasicMenu />

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>
                메인 콘텐츠
              </Typography>
              {children}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: "lightgreen" }}>
              <Typography variant="h5" color="secondary" gutterBottom>
                장바구니
              </Typography>
              <CartComponent />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BasicLayout;
