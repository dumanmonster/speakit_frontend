import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment";

const PaymentPage: FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Container
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={handleBack}
        sx={{
          position: "absolute",
          left: "20px",
          top: "100px",
        }}
      >
        <ArrowBackIcon
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
      </IconButton>
      <Typography variant="h2">Service doesn't work yet</Typography>
      {/* <Payment /> */}
    </Container>
  );
};

export default PaymentPage;
