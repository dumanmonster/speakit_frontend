import { Container, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Announcement } from "../api/interfaces";
import { useQuery } from "react-query";
import announcement from "../api/services/announcement";
import AnnouncementCard from "../components/AnnouncementCard";

const AnnouncementsPage: FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const { data } = useQuery("clubs", announcement.getAll);

  useEffect(() => {
    setAnnouncements(data?.data);
  }, [data?.data]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        justifyContent: "start",
        p: 4,
      }}
    >
      <Typography variant="h2"> All Speaking Clubs </Typography>
      {announcements?.map((el) => {
        return <AnnouncementCard announcement={el} key={el.id} />;
      })}
    </Container>
  );
};

export default AnnouncementsPage;
