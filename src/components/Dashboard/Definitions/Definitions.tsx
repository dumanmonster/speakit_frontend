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
import React, { FC, useEffect, useState } from "react";
import { tokens } from "../../../context/useMode";
import { useQuery } from "react-query";
import definition from "../../../api/services/definition";
import { Definition } from "../../../api/interfaces";
import DefinitionRow from "./DefintionRow";
import CreateDefinitionModal from "./Modals/CreateDefinitionModal";

const Definitions: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [create, setCreate] = useState<boolean>(false);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  // data

  const { data: definitionsData } = useQuery(
    "definitions",
    definition.allDefinitions,
    { refetchInterval: 1000 }
  );

  useEffect(() => {
    if (definitionsData?.data) {
      setDefinitions(definitionsData.data);
    }
  }, [definitionsData?.data]);
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
        <Typography variant="h3">Definitions</Typography>
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
              <TableCell width="10%">Word</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left" width="10%">
                Level
              </TableCell>
              <TableCell align="center" width="10%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {definitions?.map((d) => {
              return <DefinitionRow definition={d} key={d.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {create && (
        <CreateDefinitionModal open={create} handleClose={handleCreateClose} />
      )}
    </Container>
  );
};

export default Definitions;
