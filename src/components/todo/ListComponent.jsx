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
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5, mx: "auto", maxWidth: "900px" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        Todo List
      </Typography>

      {/* 리스트 아이템 (한 줄씩 표시) */}
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
            {/* Tno (번호) */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ width: "10%", textAlign: "center" }}
            >
              {todo.tno}
            </Typography>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{ width: "40%", fontWeight: "bold", px: 2 }}
            >
              {todo.title}
            </Typography>

            {/* 이미지 */}
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

            {/* Due Date */}
            <Typography
              variant="body1"
              sx={{ width: "25%", textAlign: "center" }}
            >
              {todo.dueDate}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* 페이지 네이션 */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <PageComponent serverData={serverData} movePage={moveToList} />
      </Box>
    </Paper>
  );
};

export default ListComponent;
