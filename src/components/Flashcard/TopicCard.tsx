import React, { useEffect } from "react";
import { FC } from "react";
import { Topic } from "../../api/interfaces";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../context/useMode";
import { useNavigate } from "react-router-dom";

type Props = {
  topic: Topic;
};

const TopicCard: FC<Props> = ({ topic }) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks
  const navigate = useNavigate();

  
  return (
    <Button
      onClick={() =>
        navigate(`/flashcards/${topic.id}`, { state: { id: topic.id } })
      }
      disableRipple
      disableElevation
      sx={{
        backgroundColor: colors.greenAccent[500],
        borderRadius: 5,
        opacity: 0.6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 0,
        width: "100%",
        height: "150px",
        ":hover": {
          background: colors.greenAccent[600],
          opacity: 1,
        },
      }}
    >
      <Typography variant="h3">{topic.name}</Typography>
    </Button>
  );
};
export default TopicCard;
