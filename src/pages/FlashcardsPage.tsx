import { Grid, Paper, useTheme, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Topic } from "../api/interfaces";
import topic from "../api/services/topic";
import TopicCard from "../components/Flashcard/TopicCard";

import { tokens } from "../context/useMode";

const FlashcardsPage = () => {
  // states
  const [topics, setTopics] = useState<Topic[]>([]);

  // hooks
  const { data } = useQuery("topics", topic.allTopics);

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // side effects
  useEffect(() => {
    setTopics(data?.data);
  }, [data?.data]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
        p: 4,
        gap: 4,
      }}
    >
      <Typography variant="h1">Avaiable topics</Typography>
      <Grid
        container
        sx={{
          width: "100%",
          borderColor: colors.primary[400],
          cursor: "pointer",
          userSelect: "none",
          borderRadius: 5,
          border: 1,
          gap: 5,
          padding: 4,
        }}
        justifyContent="start"
        alignItems="center"
      >
        {topics?.map((topic: Topic) => {
          return (
            <Grid
              item
              key={topic.id}
              sx={{
                width: "22%",
              }}
            >
              <TopicCard topic={topic} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FlashcardsPage;
