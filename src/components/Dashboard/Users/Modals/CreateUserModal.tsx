import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import topic, { CreateTopic } from "../../../../api/services/topic";
import { tokens } from "../../../../context/useMode";
import { useNotification } from "../../../../hooks/useNotification";

type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
};

const CreateUserModal: FC<Props> = ({ open, handleClose, refetch }) => {
  // hooks
  const [notify] = useNotification();
  const [error, setError] = useState("");

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const languages = ["EN", "FR", "ES"];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  // formik and yup
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    level: yup.string().required("required"),
    language: yup.string().required("required"),
  });
  const onSubmit = async (values: CreateTopic) => {
    formik.validateForm(values);
    try {
      await topic.create(values);

      notify({
        variant: "success",
        message: "Topic successfully created",
      });
      handleClose();
      refetch();
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

  const formik = useFormik({
    initialValues: {
      name: "",
      language: "",
      level: "",
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
        width="50%"
        height="30%"
      >
        <Typography variant="h3">Create Topic Form</Typography>
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
          sx={{
            height: "60px",
          }}
        />
        <Box display="flex" justifyContent="space-between" width="100%" gap={5}>
          <TextField
            fullWidth
            variant="filled"
            name="level"
            select
            label="Level"
            value={formik.values.level}
            onChange={formik.handleChange}
            error={!!formik.touched.level && !!formik.errors.level}
            helperText={formik.touched.level && formik.errors.level}
            sx={{
              height: "60px",
            }}
          >
            {levels.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
        </Box>

        <Button
          fullWidth
          disableElevation
          disableRipple
          color="secondary"
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{ fontWeight: 700, fontSize: "16px" }}
          onClick={() => onSubmit(formik.values)}
        >
          Create Topic
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
