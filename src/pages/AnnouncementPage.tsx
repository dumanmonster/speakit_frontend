import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Announcement, Organization } from "../api/interfaces";
import announcement from "../api/services/announcement";
import organization from "../api/services/organization";
import { tokens } from "../context/useMode";
import moment from "moment";

const AnnouncementPage: FC = () => {
  const location = useLocation();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // states
  const [ann, setAnn] = useState<Announcement | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);

  // react query fetch org and
  const { data } = useQuery(`anouncement-${location.state.id}`, () =>
    announcement.getOne(location.state.id)
  );
  const { data: orgResp } = useQuery(
    `organization-${data?.data.organizationId}`,
    () => organization.getOne(data?.data.organizationId)
  );

  useEffect(() => {
    if (orgResp?.data) {
      setOrg(orgResp.data);
    }
  }, [orgResp?.data]);
  useEffect(() => {
    if (data?.data) {
      setAnn(data.data);
    }
  }, [data?.data]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        justifyContent: "start",
        p: 4,
      }}
    >
      <IconButton
        onClick={() => navigate("/announcements")}
        sx={{
          position: "absolute",
          left: "20px",
        }}
      >
        <ArrowBackIcon
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
      </IconButton>
      <Box sx={{ width: "40%", p: 4 }}>
        <Card
          sx={{
            background: colors.primary[400],
            borderRadius: "20px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
              }}
            >
              Announcement:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                border: `1px solid ${colors.primary[500]}`,
                borderRadius: "20px",
                p: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {ann?.title}
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 600 }}>
                {ann?.description}
              </Typography>
              <Typography>
                {" "}
                Entry fee - {ann?.entryFee}{" "}
                {ann?.entryFee === "free" ? "" : "tenge"}
              </Typography>
              <Typography variant="h5">
                Format - {ann?.format.toLowerCase()}
              </Typography>
              <Typography variant="h5">
                Date - {moment(ann?.date).format("MMMM d, YYYY")}
              </Typography>
              <Typography variant="h5">
                Time - {moment(ann?.date).format("h:mma")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              disableElevation
              disableRipple
              color="secondary"
              variant="outlined"
              sx={{
                fontWeight: 500,
              }}
              onClick={() => {
                navigate("/payment", {
                  state: {
                    link: ann?.link,
                    address: org?.address,
                    city: org?.address,
                    fee: ann?.entryFee,
                  },
                });
              }}
            >
              {ann?.format === "OFFLINE"
                ? "Pay to get Address"
                : "Pay to get Link"}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Box sx={{ width: "60%", p: 4 }}>
        <Card
          sx={{
            background: colors.primary[400],
            height: "400px",
            borderRadius: "20px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
              }}
            >
              Organization:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                border: `1px solid ${colors.primary[500]}`,
                borderRadius: "20px",
                p: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {org?.name}
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 600 }}>
                Email: {org?.email}
              </Typography>
              <Typography>Phone: {org?.phone}</Typography>
              <Typography variant="h5">
                Format - {ann?.format.toLowerCase()}
              </Typography>
              <Typography variant="h5">
                Date - {moment(ann?.date).format("MMMM d, YYYY")}
              </Typography>
              <Typography variant="h5">
                Time - {moment(ann?.date).format("h:mma")}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AnnouncementPage;
