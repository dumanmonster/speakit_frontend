import React, { FC, useState } from "react";
import { Definition, Topic, User } from "../../../api/interfaces";
import { IconButton, TableCell, TableRow, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../../context/useMode";

type Props = {
  user: User;
};
const UserRow: FC<Props> = ({ user }) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [edit, setEdit] = useState(false);

  // handlers
  const handleEditOpen = () => {
    setEdit(true);
  };
  const handleEditClose = () => {
    setEdit(false);
  };

  const handleDelete = () => {
    console.log("del");
  };
  return (
    <TableRow>
      <TableCell sx={{ width: "200px" }}>{user.name}</TableCell>
      <TableCell align="left" sx={{ width: "100px" }}>
        {user.email}
      </TableCell>
      <TableCell align="left" sx={{ width: "100px" }}>
        {user.language}
      </TableCell>
      <TableCell align="left" sx={{ width: "100px" }}>
        {user.role}
      </TableCell>
      <TableCell align="center" sx={{ width: "200px" }}>
        <IconButton onClick={handleEditOpen}>
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
