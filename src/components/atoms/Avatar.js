import Avatar from "@mui/material/Avatar";

export const ProfileAvatar = ({ image, imageAlt }) => {
  return <Avatar alt={imageAlt} src={image} />;
};
