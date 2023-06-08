import React, { FC, useState } from "react";
import { Definition } from "../../../api/interfaces";
import { IconButton, TableCell, TableRow, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../../context/useMode";
import EditDefinitionModal from "./Modals/EditDefinitionModal";
import definitionApi from "../../../api/services/definition";
import { useNotification } from "../../../hooks/useNotification";
import { AxiosError } from "axios";
type Props = {
  definition: Definition;
};
const DefinitionRow: FC<Props> = ({ definition }) => {
  const [notify] = useNotification();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [edit, setEdit] = useState(false);
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
      await definitionApi.remove(definition.id);
      notify({
        variant: "success",
        message: "Definition successfully deleted",
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
      <TableCell sx={{ width: "200px" }}>{definition.word}</TableCell>
      <TableCell align="left">{definition.description}</TableCell>
      <TableCell align="left" sx={{ width: "100px" }}>
        {definition.level}
      </TableCell>
      <TableCell align="center" sx={{ width: "200px" }}>
        <IconButton onClick={handleEditOpen}>
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
      {edit && (
        <EditDefinitionModal
          open={edit}
          handleClose={handleEditClose}
          def={definition}
        />
      )}
    </TableRow>
  );
};

export default DefinitionRow;
