import React, { FC, useState } from "react";
import { Definition, Topic } from "../../../api/interfaces";
import { IconButton, TableCell, TableRow, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../../context/useMode";
import EditTopicModal from "./Modals/EditTopicModal";
import topicApi from "../../../api/services/topic";
import { useNotification } from "../../../hooks/useNotification";
import { AxiosError } from "axios";
type Props = {
  topic: Topic;
  refetch: () => void;
};
const TopicRow: FC<Props> = ({ topic, refetch }) => {
  const [notify] = useNotification();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [error, setError] = useState("");

  // handlers
  const handleEditOpen = () => {
    setEdit(true);
  };
  const handleEditClose = () => {
    setEdit(false);
  };
  const handleDelete = async () => {
    try {
      await topicApi.deleteTopic(topic.id);
      notify({
        variant: "success",
        message: "Topic successfully deleted",
      });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      notify({
        variant: "error",
        message: error,
      });
    }
  };

  return (
    <TableRow>
      <TableCell sx={{ width: "200px" }} width="20%">
        {topic.name}
      </TableCell>
      <TableCell align="left" width="10%">
        {topic.level}
      </TableCell>
      <TableCell align="left">{topic.language}</TableCell>
      <TableCell align="center" width="10%">
        <IconButton onClick={handleEditOpen}>
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
      {edit && (
        <EditTopicModal
          open={edit}
          handleClose={handleEditClose}
          topic={topic}
          refetch={refetch}
        />
      )}
    </TableRow>
  );
};

export default TopicRow;
