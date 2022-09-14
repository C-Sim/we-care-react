import { PatientTimeline } from "../components/molecules/PatientTimeline";

export const PatientDashboardPage = () => {
  return (
    <>
      <PatientTimeline
        visits={[
          {
            date: "Monday 8th August",
            time: "08:00",
            carerName: "Alice Bond",
            carerGender: "female",
          },
          {
            date: "Thursday 11th August",
            time: "08:00",
            carerName: "Alan Bates",
            carerGender: "male",
          },
        ]}
      />
    </>
  );
};
