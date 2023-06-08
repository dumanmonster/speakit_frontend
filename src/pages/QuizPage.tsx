import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../context/useMode";
import { useQuery } from "react-query";
import topic from "../api/services/topic";
import { Definition } from "../api/interfaces";
import Quiz from "../components/Quiz";
import { useNotification } from "../hooks/useNotification";

const QuizPage: FC = () => {
  // data
  const { data } = useQuery("topic_definitions", () =>
    topic.topicDefinitionsById(location.state.id)
  );
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();
  const [notify] = useNotification();
  // states
  const [current, setCurrent] = useState(1);
  const [definitions, setDefinitons] = useState<Map<number, Definition>>(
    new Map()
  );
  const [topicId, setTopicId] = useState<string>(location.state.id);
  const [points, setPoints] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handlers
  const handlePlusPoint = (isCorrect: boolean) => {
    if (isCorrect) {
      setPoints((prev) => {
        return prev + 1;
      });
    }
  };
  const handleNext = () => {
    if (current == data?.data.length) {
      return;
    }
    setCurrent(current + 1);
  };
  const handlePrev = () => {
    if (current == 1) {
      return;
    }
    setCurrent(current - 1);
  };

  const getAllOtherVariants = (current: number) => {
    let count = 0;
    const variants = [];
    for (let i = 1; i <= data?.data.length; i++) {
      if (i == current) {
        continue;
      }
      if (count == 3) {
        break;
      }
      variants.push(definitions.get(i)?.word);
      count++;
    }

    return variants.length ? variants : [];
  };
  // side effects
  useEffect(() => {
    setTopicId(location.state.id);
    if (data?.data.length) {
      const definitions = [...data.data];
      definitions.forEach((definition: Definition, index: number) => {
        setDefinitons((prev) => {
          return prev?.set(index + 1, definition);
        });
      });
    }
  }, [data?.data, definitions, location.pathname, location.state.id]);
  return (
    <Container
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <IconButton
        onClick={() =>
          navigate(`/flashcards/${location?.state?.id}`, {
            state: { id: topicId },
          })
        }
        sx={{
          position: "absolute",
          left: "20px",
        }}
      >
        <ArrowBackIcon
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
      </IconButton>
      <Typography
        variant="h1"
        sx={{
          justifySelf: "center",
        }}
      >
        Quiz on topic - {location.state.name}
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "90%",
          marginTop: "32px",
          borderColor: colors.primary[400],
          padding: 2,
          borderRadius: 5,
          border: 1,
          background: "none",
          justifySelf: "center",
          justifyContent: "space-between",
        }}
      >
        {data?.data && (
          <Quiz
            key={definitions.get(current)?.id}
            definition={definitions.get(current)?.description || ""}
            word={definitions.get(current)?.word || ""}
            variants={getAllOtherVariants(current)}
            handleNext={handleNext}
            handlePlusPoint={(isCorrect) => handlePlusPoint(isCorrect)}
            isSubmitting={isSubmitting}
          />
        )}
        <Box
          display="flex"
          gap={2}
          width="100%"
          height="10%"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            disableElevation
            disableRipple
            color="secondary"
            variant="contained"
            onClick={handlePrev}
            disabled
          >
            Previous
          </Button>
          <Typography variant="h5">
            {current} / {data?.data.length}
          </Typography>
          {current !== data?.data.length ? (
            <Button
              disableElevation
              disableRipple
              color="secondary"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              disableElevation
              disableRipple
              color="secondary"
              variant="contained"
              onClick={() => {
                setIsSubmitting(true);
                navigate("/profile");
                notify({variant: "success", message: "Congratulations, you can see your results in Learned topics Tab"})
              }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default QuizPage;
