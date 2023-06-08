import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { tokens } from "../context/useMode";
import { useNavigate } from "react-router-dom";

const ErrorPage: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h1" color="secondary">
        404
      </Typography>
      <Typography variant="h4">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
