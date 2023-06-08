import { Container, Typography, Box, useTheme } from "@mui/material";
import React, { FC } from "react";
import { tokens } from "../context/useMode";

const Footer: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
      sx={{
        borderTop: `1px solid ${colors.grey[800]}`,
      }}
    >
      <Typography variant="h6">
        &copy; Copyright 2023, Example Corporation
      </Typography>
    </Box>
  );
};

export default Footer;
