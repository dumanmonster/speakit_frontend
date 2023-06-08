import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Topic, User } from "../../../api/interfaces";
import topic from "../../../api/services/topic";
import { tokens } from "../../../context/useMode";
import UserRow from "./UserRow";
import user from "../../../api/services/user";

const Users: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [create, setCreate] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  // data

  const { data: usersData } = useQuery("users", user.getUsers);

  useEffect(() => {
    if (usersData?.data) {
      setUsers(usersData.data);
    }
  }, [usersData?.data]);
  // handlers
  const handleCreateOpen = () => {
    setCreate(true);
  };

  const handleCreateClose = () => {
    setCreate(false);
  };
  return (
    <Container
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3">Users</Typography>
        <Button
          disableElevation
          disableRipple
          color="secondary"
          variant="contained"
          onClick={handleCreateOpen}
        >
          Create
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          background: colors.primary[600],
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width="10%">Name</TableCell>
              <TableCell width="10%" align="left">
                Email
              </TableCell>
              <TableCell width="10%" align="left">
                Language
              </TableCell>

              <TableCell align="left">Role</TableCell>
              <TableCell align="center" width="10%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((u) => {
              return <UserRow user={u} key={u.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
