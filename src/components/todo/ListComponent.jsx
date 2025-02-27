import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, getList } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import FetchingModal from "../common/FetchingModal";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const host = API_SERVER_HOST;

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["todo/list", { page, size, refresh }],
    queryFn: () => getList({ page, size }),
    staleTime: 1000 * 100,
  });

  

  const serverData = data || initState;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5, mx: "auto", maxWidth: "900px" }}>
      {isFetching ? <FetchingModal /> : <></>}
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        Todo List
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {serverData.dtoList.map((todo) => (
          <Card
            key={todo.tno}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              cursor: "pointer",
              boxShadow: 2,
              borderRadius: 2,
            }}
            onClick={() => moveToRead(todo.tno)}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ width: "10%", textAlign: "center" }}
            >
              {todo.tno}
            </Typography>

            <Typography
              variant="h6"
              sx={{ width: "40%", fontWeight: "bold", px: 2 }}
            >
              {todo.title}
            </Typography>
            <Box
              sx={{ width: "25%", display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                component="img"
                image={`${host}/api/todo/view/s_${todo.imageFile}`}
                alt="todo"
                sx={{
                  height: 100,
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ width: "25%", textAlign: "center" }}
            >
              {todo.dueDate}
            </Typography>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <PageComponent serverData={serverData} movePage={moveToList} />
      </Box>
    </Paper>
  );
};

export default ListComponent;
