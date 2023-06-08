import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import auth from "../api/services/auth";
import { Container } from "../assets/styles/common";
import { useNotification } from "../hooks/useNotification";
import { tokens } from "../context/useMode";
const RegistrationPage: FC = () => {
  // hooks
  const navigate = useNavigate();
  const [notify] = useNotification();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [error, setError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // handlers
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);

  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    language: string;
  }) => {
    setError("");

    try {
      const response = await auth.register(values);

      navigate("/login");
      notify({ variant: "success", message: "Account successfully created" });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      notify({
        variant: "error",
        message: "User with such email already exist",
      });
    }
  };
  // formik and yup
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    password2: yup
      .string()
      .required("required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .oneOf([yup.ref("password")], "Passwords must match"),
    language: yup.string().required("required").length(2),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      language: "EN",
    },
    onSubmit,
    validationSchema: checkoutSchema,
  });

  const languages = ["EN", "FR", "ES"];
  return (
    <Container>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="30px"
        padding="20px 10px"
        width="600px"
        margin={0}
      >
        <Typography variant="h2" color="secondary">
          Create new account
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          name="name"
          label="Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          margin="dense"
          sx={{
            height: "60px",
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          name="email"
          label="Email"
          type="email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          margin="dense"
          sx={{
            height: "60px",
          }}
        />
        <Box display="flex" justifyContent="space-between" gap={5} width="100%">
          <TextField
            fullWidth
            variant="filled"
            name="password"
            label="Password"
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
            label="Confirm password"
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
        </Box>
        <TextField
          fullWidth
          variant="filled"
          name="language"
          select
          label="Language"
          value={formik.values.language}
          onChange={formik.handleChange}
          error={!!formik.touched.language && !!formik.errors.language}
          helperText={formik.touched.language && formik.errors.language}
          sx={{
            height: "60px",
          }}
        >
          {languages.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
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
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
