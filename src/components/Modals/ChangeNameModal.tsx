import { Box, Button, Modal, TextField, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import userApi from "../../api/services/user";
import { tokens } from "../../context/useMode";
import { useNotification } from "../../hooks/useNotification";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  open: boolean;
  handleClose: () => void;
  userId: string;
};

const ChangeNameModal: FC<Props> = ({ open, handleClose, userId }) => {
  // hooks
  const [notify] = useNotification();
  const { logout } = useAuth();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [error, setError] = useState("");

  // side effects

  // handlers
  const onSubmit = async (values: { name: string }) => {
    try {
      await userApi.updateUserName(userId, values.name);
      logout();
      notify({
        variant: "success",
        message: "User Name successfully changed, login again",
      });
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
    name: yup
      .string()
      .required("required")
      .min(6, "Name is too short - should be 6 chars minimum."),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit,
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
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="15%"
        height="30%"
      >
        <TextField
          fullWidth
          variant="filled"
          name="name"
          label="New name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          sx={{
            height: "60px",
          }}
        />

        <Button
          fullWidth
          disableElevation
          disableRipple
          color="secondary"
          variant="contained"
          disabled={formik.isSubmitting}
          onClick={() => onSubmit(formik.values)}
          sx={{ fontWeight: 700, fontSize: "16px" }}
        >
          Change name
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangeNameModal;
