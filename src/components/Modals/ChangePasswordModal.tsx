import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
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
};

const ChangePasswordModal: FC<Props> = ({ open, handleClose, userId }) => {
  // hooks
  const [notify] = useNotification();
  const { logout } = useAuth();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");

  // side effects

  // handlers
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);
  const onSubmit = async (values: { password: string; password2: string }) => {
    try {
      await userApi.updateUserPassword(userId, values.password);
      notify({ variant: "success", message: "Password successfully changed" });
      logout();
      notify({ variant: "info", message: "Sign in with new password" });
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
    password: yup
      .string()
      .required("required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    password2: yup
      .string()
      .required("required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      password2: "",
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
          name="password"
          label="New password"
          type={showPassword1 ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            height: "60px",
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword1}
              >
                {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          name="password2"
          label="Confirm new password"
          type={showPassword2 ? "text" : "password"}
          value={formik.values.password2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.password2 && !!formik.errors.password2}
          helperText={formik.touched.password2 && formik.errors.password2}
          sx={{
            height: "60px",
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
              >
                {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
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
          Change password
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
