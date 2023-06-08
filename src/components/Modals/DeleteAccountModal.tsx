import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC, useState } from "react";

import * as yup from "yup";
import userApi from "../../api/services/user";
import { tokens } from "../../context/useMode";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

type Props = {
  open: boolean;
  handleClose: () => void;
  userId: string;
  email: string;
};
const DeleteAccountModal: FC<Props> = ({
  open,
  handleClose,
  userId,
  email,
}) => {
  // states
  const [error, setError] = useState("");

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks
  const [notify] = useNotification();
  const { logout } = useAuth();

  const deleteAccount = async () => {
    try {
      await userApi.deleteUser(userId);
      notify({ variant: "success", message: "User successfully deleted" });
      logout();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      notify({
        variant: "error",
        message: error,
      });
      handleClose();
    }
  };
  // formik and yup
  const checkoutSchema = yup.object().shape({
    email: yup.string().oneOf([email], "Email should match"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: deleteAccount,
    validationSchema: checkoutSchema,
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: colors.primary[500],
      }}
    >
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
        width="25%"
        height="15%"
      >
        <Typography variant="h5">Enter your current email - {email}</Typography>
        <TextField
          fullWidth
          variant="filled"
          name="email"
          label="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          margin="dense"
          autoComplete="off"
          sx={{
            height: "60px",
          }}
        />
        <Button
          fullWidth
          disableElevation
          disableRipple
          color="error"
          variant="contained"
          sx={{ fontWeight: 700, fontSize: "16px" }}
          disabled={!formik.isValid}
          onClick={deleteAccount}
        >
          Delete account
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
