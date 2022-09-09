import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const NextVisitForCarer = () => {
  return (
    <>
      <Stack spacing={1} direction="column">
        <Button variant="Contained">Update care notes</Button>
        <Button variant="contained">View past visit notes</Button>
        <Button variant="Contained">View Patient Profile</Button>
      </Stack>
      ;
    </>
  );
};
