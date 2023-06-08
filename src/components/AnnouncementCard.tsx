import React, { FC, useEffect, useState } from "react";
import { Announcement, Organization } from "../api/interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../context/useMode";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useQuery } from "react-query";
import organization from "../api/services/organization";
type Props = {
  announcement: Announcement;
};
const AnnouncementCard: FC<Props> = ({ announcement }) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // state
  const [org, setOrg] = useState<Organization | null>(null);
  const { data } = useQuery(`organization-${announcement.organizationId}`, () =>
    organization.getOne(announcement.organizationId)
  );
  useEffect(() => {
    if (data?.data) {
      setOrg(data.data);
    }
  }, [data?.data]);
  return (
    <Card
      sx={{
        minWidth: "400px",
        background: colors.primary[400],
        borderRadius: "20px",
        width: "90%",
        alignSelf: "center",
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {announcement.title}
        </Typography>
        <Typography variant="h5">
          Format - {announcement.format.toLowerCase()}
        </Typography>
        <Typography variant="h5">
          Date - {moment(announcement.date).format("MMMM d, YYYY")}
        </Typography>
        <Typography variant="h5">
          Time - {moment(announcement.date).format("h:mma")}
        </Typography>
        <Typography>
          Entry fee - {announcement.entryFee}{" "}
          {announcement.entryFee === "free" ? "" : "tenge"}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex" }}>
        <Button
          disableElevation
          disableRipple
          color="secondary"
          variant="outlined"
          sx={{
            fontWeight: 500,
          }}
          onClick={() => {
            navigate(`${announcement.id}`, {
              state: { id: announcement.id },
            });
          }}
        >
          Go
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;
