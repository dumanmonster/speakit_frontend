import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Definition } from "../../api/interfaces";
import { tokens } from "../../context/useMode";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { bool } from "yup";
type Props = {
  definition: Definition | null;
};

const Flashcard: FC<Props> = ({ definition }) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fav, isFav] = useState(false);

  // effect
  useEffect(() => {
    setIsFlipped(false);
  }, []);

  if (definition == null) {
    return <Skeleton variant="rounded" width="100%" height="85%" />;
  }

  // audio speech
  function handlePlayButtonClick(event: any, text: string) {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.addEventListener("start", () => {
      setIsPlaying(true);
    });

    utterance.addEventListener("end", () => {
      setIsPlaying(false);
    });

    window.speechSynthesis.speak(utterance);
  }
  return (
    <Paper
      onClick={() => setIsFlipped(!isFlipped)}
      sx={[
        {
          width: "100%",
          height: "85%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          backgroundColor: colors.primary[500],
          borderRadius: 5,
        },
        isFlipped && {
          transform: "rotateY(180deg)",
        },
      ]}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={(event) => handlePlayButtonClick(event, definition.word)}
          sx={{
            position: "absolute",
            top: "4px",
            left: "4px",
          }}
        >
          {isPlaying ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        <IconButton
          onClick={(event) => console.log("fav")}
          sx={{
            position: "absolute",
            top: "4px",
            right: "4px",
          }}
        >
          {!isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography
          variant="h1"
          sx={{
            justifySelf: "center",
          }}
        >
          {definition.word}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={(event) =>
            handlePlayButtonClick(event, definition.description)
          }
          sx={{
            position: "absolute",
            top: "4px",
            left: "4px",
          }}
        >
          {isPlaying ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        <IconButton
          onClick={(event) => console.log("fav")}
          sx={{
            position: "absolute",
            top: "4px",
            right: "4px",
          }}
        >
          {!isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="h3">{definition.description}</Typography>
      </Box>
    </Paper>
  );
};

export default Flashcard;
