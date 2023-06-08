import React, { FC, useState } from "react";
import { User } from "../../api/interfaces";
import { tokens } from "../../context/useMode";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import ChangeNameModal from "../Modals/ChangeNameModal";

type Props = {
  user: User | null;
};

const ProfileInfo: FC<Props> = ({ user }) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const firstLetter = user?.name.charAt(0).toUpperCase();

  // states
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState(false);
  const [changeName, setChangeName] = useState(false);

  // handlers
  const handleOpen = () => {
    setChangePassword(true);
  };
  const handleClose = () => {
    setChangePassword(false);
  };
  const handleOpenDelete = () => {
    setDeleteAcc(true);
  };
  const handleCloseDelete = () => {
    setDeleteAcc(false);
  };
  const handleOpenName = () => {
    setChangeName(true);
  };
  const handleCloseName = () => {
    setChangeName(false);
  };
  return (
    <>
      <Avatar
        color="primary"
        sx={{
          width: "150px",
          height: "150px",
          fontSize: "40px",
          fontWeight: "800",
          backgroundColor: colors.primary[400],
          color: colors.redAccent[300],
          border: `1px solid ${colors.primary[500]}`,
        }}
      >
        {firstLetter}
      </Avatar>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="h6">Name</Typography>
          <IconButton onClick={handleOpenName}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h6">{user?.name}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="h6">Email</Typography>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="h6">{user?.email}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="h6">Language</Typography>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="h6">{user?.language}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography
          variant="h6"
          alignSelf="flex-start"
          fontSize="12px"
          fontWeight="300"
        >
          Registration date
        </Typography>
        <Typography variant="h6" alignSelf="flex-start" fontSize="12px">
          {moment(user?.createdAt).format("MMMM Do YYYY")}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography variant="h6" alignSelf="flex-start">
          Language Level
        </Typography>
        <Typography variant="h6" alignSelf="flex-start">
          {user?.level}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Button
          disableElevation
          disableRipple
          color="secondary"
          variant="contained"
          onClick={handleOpen}
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            height: "40px",
            width: "40%",
          }}
        >
          Change password
        </Button>
        <Button
          fullWidth
          disableElevation
          disableRipple
          color="error"
          variant="contained"
          onClick={handleOpenDelete}
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            height: "40px",
            width: "20%",
          }}
        >
          Delete
        </Button>
      </Box>
      {changePassword && (
        <ChangePasswordModal
          open={changePassword}
          handleClose={handleClose}
          userId={user?.id || ""}
        />
      )}
      {deleteAcc && (
        <DeleteAccountModal
          open={deleteAcc}
          handleClose={handleCloseDelete}
          userId={user?.id || ""}
          email={user?.email || ""}
        />
      )}
      {changeName && (
        <ChangeNameModal
          open={changeName}
          handleClose={handleCloseName}
          userId={user?.id || ""}
        />
      )}
    </>
  );
};

export default ProfileInfo;
