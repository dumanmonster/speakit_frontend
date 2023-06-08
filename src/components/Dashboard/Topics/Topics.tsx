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
import { Topic } from "../../../api/interfaces";
import topic from "../../../api/services/topic";
import { tokens } from "../../../context/useMode";
import TopicRow from "./TopicRow";
import CreateTopicModal from "./Modals/CreateTopicModal";

const Topics: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [create, setCreate] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  // data

  const { data: topicsData, refetch } = useQuery("topics", topic.allTopics);

  useEffect(() => {
    if (topicsData?.data) {
      setTopics(topicsData.data);
    }
  }, [topicsData?.data]);
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
        <Typography variant="h3">Topics</Typography>
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
              <TableCell width="20%">Name</TableCell>
              <TableCell align="left" width="10%">
                Level
              </TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="center" width="10%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics?.map((t) => {
              return <TopicRow topic={t} key={t.id} refetch={refetch} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {create && (
        <CreateTopicModal
          open={create}
          handleClose={handleCreateClose}
          refetch={refetch}
        />
      )}
    </Container>
  );
};

export default Topics;
