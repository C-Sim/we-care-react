import Avatar from "@mui/material/Avatar";

export const ProfileAvatar = ({ image, carerName }) => {
  return <Avatar alt={carerName} src={image} />;
};
