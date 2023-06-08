import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Radio,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { tokens } from "../context/useMode";
import { useNotification } from "../hooks/useNotification";

type Props = {
  definition: string;
  word: string;
  variants: (string | undefined)[];
  handleNext: () => void;
  handlePlusPoint: (isCorrect: boolean) => void;
  isSubmitting: boolean;
};
const Quiz: FC<Props> = ({
  definition,
  word,
  variants,
  handleNext,
  handlePlusPoint,
  isSubmitting,
}) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [notify] = useNotification();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [correct, setCorrect] = useState<boolean>(false);

  useEffect(() => {
    if (selectedAnswer === word) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }, [selectedAnswer, word]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    if (event.target.value === word) {
      handlePlusPoint(true); // Call handlePlusPoint with true if answer is correct
    }
  };
  // timer
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds = 1 minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const progressValue = ((60 - timeRemaining) / 60) * 100;
    setProgress(progressValue);
    // handleNext();
    if (timeRemaining == 0) {
      handlePlusPoint(correct);
      handleNext();
    }
    if (timeRemaining == 10) {
      notify({ variant: "warning", message: "You have 10 seconds left ..." });
    }
  }, [handleNext, notify, timeRemaining, correct, handlePlusPoint]);
  
  return (
    <Paper
      sx={[
        {
          width: "100%",
          height: "85%",
          backgroundColor: colors.primary[500],
          borderRadius: 5,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Box sx={{ width: "100%", height: "1%" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">{definition}</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", height: "39%" }}
      >
        {[...variants, word].map((ans, index) => {
          return (
            <Grid
              key={index}
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <Radio
                checked={selectedAnswer === ans}
                onChange={handleChange}
                value={ans}
                name={ans}
                sx={{
                  color: colors.greenAccent[500],
                  "&.Mui-checked": {
                    color: colors.greenAccent[800],
                  },
                }}
              />
              <Typography variant="h5">{ans}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default Quiz;
