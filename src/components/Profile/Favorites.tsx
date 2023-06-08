import React, { FC } from "react";
import { User } from "../../api/interfaces";
import { tokens } from "../../context/useMode";
import { useTheme } from "@mui/material";
type Props = {
  user: User | null;
};

const Favorites: FC<Props> = ({ user }) => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return <div>Favorites</div>;
};

export default Favorites;
