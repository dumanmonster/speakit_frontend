import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { tokens } from "../context/useMode";
import { useTimer } from "../context/useTimer";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";

const PomodoroPage: FC = () => {
  const {
    circ,
    currentSet,
    time,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
  } = useTimer();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [notify] = useNotification();
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
        p: "20px",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">Pomodoro Timer</Typography>
      <CircularProgress
        variant="determinate"
        color="secondary"
        value={(time / circ) * 100} // Calculates progress based on current time and initial time
        size={200}
        sx={{ borderRadius: "50%", border: `1px solid ${colors.grey[900]}` }}
        thickness={2}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          bottom: 0,
        }}
      >
        <Typography variant="h4" component="div">
          {formatTime(time)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3">
          {currentSet % 2 == 1 ? "Time to focus" : "Time to break"}
        </Typography>
      </Box>
      <Box display="flex">
        <CheckCircleOutlineIcon
          sx={
            currentSet > 1
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
        <HorizontalRuleIcon
          sx={
            currentSet > 2
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
        <CheckCircleOutlineIcon
          sx={
            currentSet > 3
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
        <HorizontalRuleIcon
          sx={
            currentSet > 4
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
        <CheckCircleOutlineIcon
          sx={
            currentSet > 5
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
        <HorizontalRuleIcon
          sx={
            currentSet > 6
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
        <CheckCircleOutlineIcon
          sx={
            currentSet > 7
              ? { color: colors.greenAccent[500] }
              : { color: colors.grey[500] }
          }
        />
      </Box>
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          onClick={() => {
            startTimer();
            notify({
              variant: "success",
              message: "Your time is going ... tic-tac, go and study",
            });
            navigate('/flashcards')
          }}
          color="secondary"
        >
          Start
        </Button>
        <Button variant="contained" onClick={() => {
            pauseTimer();
            notify({
              variant: "info",
              message: "Your time is freezed xxx",
            });
          }} color="secondary">
          Pause
        </Button>
        <Button variant="contained" onClick={() => {
            resetTimer();
            notify({
              variant: "info",
              message: "Your time is up!",
            });
          }} color="secondary">
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default PomodoroPage;
