import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../context/useMode";
import { Outlet, useNavigate } from "react-router-dom";
import TranslateIcon from "@mui/icons-material/Translate";
import CampaignIcon from "@mui/icons-material/Campaign";
import PeopleIcon from "@mui/icons-material/People";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import TopicIcon from "@mui/icons-material/Topic";
const DashboardLayout = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        width="20%"
        display="flex"
        flexDirection="column"
        borderRight={"1px solid" + colors.grey[800]}
      >
        <Box
          width="100%"
          height="50px"
          borderBottom={"1px solid" + colors.grey[800]}
          display="flex"
          justifyContent="space-between"
          paddingRight={4}
          alignItems="center"
          paddingLeft={4}
          onClick={() => navigate("definitions")}
        >
          <Typography variant="h5">Definitions</Typography>
          <TranslateIcon />
        </Box>
        <Box
          width="100%"
          height="50px"
          borderBottom={"1px solid" + colors.grey[800]}
          display="flex"
          justifyContent="space-between"
          paddingRight={4}
          alignItems="center"
          paddingLeft={4}
          onClick={() => navigate("topics")}
        >
          <Typography variant="h5">Topics</Typography>
          <TopicIcon />
        </Box>
        {/* <Box
          width="100%"
          height="50px"
          borderBottom={"1px solid" + colors.grey[800]}
          display="flex"
          justifyContent="space-between"
          paddingRight={4}
          alignItems="center"
          paddingLeft={4}
          onClick={() => navigate("organizations")}
        >
          <Typography variant="h5">Organizations</Typography>
          <CorporateFareIcon />
        </Box> */}
        {/* <Box
          width="100%"
          height="50px"
          borderBottom={"1px solid" + colors.grey[800]}
          display="flex"
          justifyContent="space-between"
          paddingRight={4}
          alignItems="center"
          paddingLeft={4}
          onClick={() => navigate("announcements")}
        >
          <Typography variant="h5">Announcements</Typography>
          <CampaignIcon />
        </Box> */}
        <Box
          width="100%"
          height="50px"
          borderBottom={"1px solid" + colors.grey[800]}
          display="flex"
          justifyContent="space-between"
          paddingRight={4}
          alignItems="center"
          paddingLeft={4}
          onClick={() => navigate("users")}
        >
          <Typography variant="h5">Users</Typography>
          <PeopleIcon />
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default DashboardLayout;
