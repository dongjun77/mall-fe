import React from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";
import { Container, Typography, Paper, Box } from "@mui/material";

function ReadPage() {
  const { tno } = useParams();

  return (
    <div>
      <ReadComponent tno={tno} />
    </div>
  );
}

export default ReadPage;
