import React from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";
import { Container, Typography, Paper, Box } from "@mui/material";

function ReadPage() {
  const { tno } = useParams();

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Todo Read Page
        </Typography>

        <Typography variant="h6" color="textSecondary">
          {`Todo Number: ${tno}`}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <ReadComponent tno={tno} />
        </Box>
      </Paper>
    </Container>
  );
}

export default ReadPage;
