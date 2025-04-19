import React from "react";
import { API_S3_HOST, getRecentTodo } from "../../api/todoApi";
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

const s3_prefix = API_S3_HOST;

const RecentProductComponent = () => {
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["todo/recent"],
    queryFn: () => getRecentTodo(),
    staleTime: 1000 * 600,
  });

  const serverData = data || [];

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5, mx: "auto", maxWidth: "1200px" }}>
      {isFetching ? <FetchingModal /> : null}
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        최근 등록된 Todo
      </Typography>

      <Grid container spacing={2}>
        {serverData.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.tno}>
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
                image={`${s3_prefix}todo/s_${todo.imageFile ?? "default.jpeg"}`}
                alt={todo.title}
                sx={{
                  height: 140,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {todo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {todo.content}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  📧 {todo.memberEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🗓️ {todo.dueDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default RecentProductComponent;
