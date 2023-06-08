import React, { FC } from "react";
import { User } from "../../api/interfaces";

type Props = {
  user: User | null;
};

const ProfileSettings: FC<Props> = () => {
  return <div>ProfileSettings</div>;
};

export default ProfileSettings;
