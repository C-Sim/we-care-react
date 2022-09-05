import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export const ReviewFixed = ({ value }) => {
  return (
    <Rating
      name="read-only size-large half-rating-read"
      size="large"
      value={value}
      precision={0.5}
      readOnly
    />
  );
};
