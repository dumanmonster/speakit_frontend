import React, { FC, useState } from "react";
import { useNotification } from "../../../../hooks/useNotification";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../../context/useMode";
import * as yup from "yup";
import { useFormik } from "formik";
import definition, {
  CreateDefinition,
} from "../../../../api/services/definition";
import { useQuery } from "react-query";
import topic from "../../../../api/services/topic";
import { Topic } from "../../../../api/interfaces";
import { AxiosError } from "axios";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CreateDefinitionModal: FC<Props> = ({ open, handleClose }) => {
  // hooks
  const [notify] = useNotification();
  const [error, setError] = useState("");

  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const languages = ["EN", "FR", "ES"];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const { data: topicData } = useQuery("topics", topic.allTopics);
  // formik and yup
  const checkoutSchema = yup.object().shape({
    word: yup.string().required("required"),
    description: yup
      .string()
      .required("required")
      .min(10, "Description is too short"),
    level: yup.string().required("required"),
    topicId: yup.string().required("required"),
  });
  const onSubmit = async (values: CreateDefinition) => {
    formik.validateForm(values);
    try {
      await definition.create(values);

      notify({
        variant: "success",
        message: "Definition successfully created",
      });
      handleClose()
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
      word: "",
      description: "",
      level: "",
      topicId: "",
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
        <Typography variant="h3">Create Definition Form</Typography>
        <TextField
          fullWidth
          variant="filled"
          name="word"
          label="Word"
          type="text"
          value={formik.values.word}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.word && !!formik.errors.word}
          helperText={formik.touched.word && formik.errors.word}
          sx={{
            height: "60px",
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          name="description"
          label="Description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
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
            name="topicId"
            select
            label="Topic"
            value={formik.values.topicId}
            onChange={formik.handleChange}
            error={!!formik.touched.topicId && !!formik.errors.topicId}
            helperText={formik.touched.topicId && formik.errors.topicId}
            sx={{
              height: "60px",
            }}
          >
            {topicData?.data.map((option: Topic) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
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
          Create Definition
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateDefinitionModal;
