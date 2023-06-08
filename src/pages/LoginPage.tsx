import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import auth from "../api/services/auth";
import { Container } from "../assets/styles/common";
import { tokens } from "../context/useMode";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import userApi from "../api/services/user";
import { User } from "../api/interfaces";
const LoginPage: FC = () => {
  // hooks
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [notify] = useNotification();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, getUser, loginWithGoogle, updateUserInfo } = useAuth();

  // handlers
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (values: { email: string; password: string }) => {
    setError("");

    try {
      const response = await auth.login(values);
      if (response.data) {
        await login(response.data.accessToken);

        const userInfo = await userApi.userInfo(values.email);
        updateUserInfo(userInfo.data);
        const newUser = getUser();
        setUser(newUser);
        if (newUser?.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/announcements");
        }
        notify({ variant: "success", message: "Successfully logged in" });
      } else if (response.statusText === "Not Found") {
        notify({
          variant: "warning",
          message: "User with such email do not exist!",
        });
      }

      console.log(user);
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      notify({
        variant: "error",
        message: "Incorrect email or password, try again!",
      });
    }
  };

  // formik and yup
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: checkoutSchema,
  });

  // google
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      loginWithGoogle(codeResponse.access_token);
      navigate("/flashcards");
      notify({ variant: "success", message: "Successfully logged in" });
    },
    onError: (codeResponse) => {
      notify({
        variant: "error",
        message: `Error: ${codeResponse.error_description}`,
      });
    },
  });
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
        <Button
          disableElevation
          disableRipple
          color="secondary"
          variant="outlined"
          sx={{ fontWeight: 700, fontSize: "16px" }}
          onClick={() => googleLogin()}
        >
          Google
          <GoogleIcon />
        </Button>
        <Typography variant="h2" color="secondary">
          Sign in to the account
        </Typography>
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
        <TextField
          fullWidth
          variant="filled"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
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
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
          Login
        </Button>
        <Divider />
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="h6" paddingRight={2}>
            Do not have an account?
          </Typography>
          <Link
            underline="hover"
            color="secondary"
            variant="h6"
            onClick={() => navigate("/register")}
          >
            Register now!
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
