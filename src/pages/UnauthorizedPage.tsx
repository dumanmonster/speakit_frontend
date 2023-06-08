import { Container, Typography, useTheme, Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { tokens } from "../context/useMode";

const UnauthorizedPage: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container
      sx={{
        width: "100%",
        height: "400px",
      }}
    >
      <Typography variant="h1">Ooops... Unauthorized</Typography>
      <Typography variant="h2">
        You do not have access to the requested page.
      </Typography>
      <Button
        disableElevation
        disableRipple
        color="secondary"
        variant="outlined"
        sx={{ fontWeight: 700, fontSize: "19px" }}
        onClick={goBack}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default UnauthorizedPage;
