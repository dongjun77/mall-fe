import React, { useEffect, useState } from "react";
import { API_SERVER_HOST, getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

const initState = {
  tno: 0,
  title: "",
  content: "",
  memberEmail: "",
  complete: false,
  dueDate: "",
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);

  return (
    <Paper elevation={3} sx={{ p: 4, mx: "auto", maxWidth: "800px" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Todo Details
      </Typography>

      <Grid container spacing={2}>
        {makeInfo("Tno", todo.tno)}
        {makeInfo("Title", todo.title)}
        {makeInfo("Member Email", todo.memberEmail)}
        {makeInfo("Content", todo.content)}
        {makeInfo("Due Date", todo.dueDate)}
        {makeInfo("Complete", todo.complete ? "Completed" : "Not Yet")}
      </Grid>

      {/* 이미지 리스트 */}
      {todo.uploadFileNames.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 3,
          }}
        >
          {todo.uploadFileNames.map((imgFile, i) => (
            <Card key={i} sx={{ maxWidth: 300, m: 1 }}>
              <CardMedia
                component="img"
                image={`${host}/api/todo/view/${imgFile}`}
                alt="todo"
                sx={{ height: 200 }}
              />
            </Card>
          ))}
        </Box>
      )}

      {/* 버튼 영역 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={moveToList}
          sx={{ mr: 2 }}
        >
          List
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => moveToModify(todo.tno)}
        >
          Modify
        </Button>
      </Box>
    </Paper>
  );
};

// ✅ `makeDiv`를 `Grid` 기반 `makeInfo`로 변경
const makeInfo = (label, value) => (
  <Grid item xs={12} sm={12} key={label}>
    <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Grid>
);

export default ReadComponent;
