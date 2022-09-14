import { PatientTimeline } from "../components/molecules/PatientTimeline";
import { NextVisitPatient } from "../components/organisms/NextVisitPatient";

export const PatientDashboardPage = () => {
  return (
    <>
      <h1>Welcome, UserName</h1>
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
      <NextVisitPatient />
    </>
  );
};
