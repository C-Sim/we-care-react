import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ProfileAvatar = ({ image, imageAlt }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Avatar alt={imageAlt} src={image} sx={{ width: "72px", height: "72px" }} />
  );
};
