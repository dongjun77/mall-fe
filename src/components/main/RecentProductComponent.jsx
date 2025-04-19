import React from "react";
import { API_S3_HOST, API_SERVER_HOST } from "../../api/todoApi";
import { useQuery } from "@tanstack/react-query";
import FetchingModal from "../common/FetchingModal";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getRecentProducts } from "../../api/productApi";

const s3_prefix = API_S3_HOST;

const DeadlineTodoComponent = () => {
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["product/deadline"],
    queryFn: () => getRecentProducts(),
    staleTime: 1000 * 600,
  });

  const serverData = data || [];

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5, mx: "auto", maxWidth: "1200px" }}>
      {isFetching ? <FetchingModal /> : null}
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        신제품
      </Typography>

      <Grid container spacing={2}>
        {serverData.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.pno}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                image={`${s3_prefix}product/s_${
                  product.imageFile ?? "default.jpeg"
                }`}
                sx={{
                  height: 140,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.pname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {product.pdesc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default DeadlineTodoComponent;
