import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./containers/LandingPage";
import { LoginPage } from "./containers/LoginPage";
import { SignUpPage } from "./containers/SignUpPage";
import { CarerDashboardPage } from "./containers/CarerDashboardPage";
import { PatientDashboardPage } from "./containers/PatientDashboardPage";
import { SupervisorDashboardPage } from "./containers/SupervisorDashboardPage";
import { AboutPage } from "./containers/AboutPage";

import { CarePlanPage } from "./containers/CarePlanPage";
import { NotificationsPage } from "./containers/NotificationsPage";
import { SupervisorCreateCarerPage } from "./containers/SupervisorCreateCarerPage";
import { SupervisorAssignPage } from "./containers/SupervisorAssignPage";
import { CarerProfilePage } from "./containers/CarerProfilePage";
import { PatientsProfilePage } from "./containers/PatientProfilePage";

import { useAuth } from "./context/AppProvider";
import { CarerCalendarPage } from "./containers/CarerCalendarPage";

export const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/about" element={<AboutPage />} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route path="/carer-dashboard" element={<CarerDashboardPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboardPage />} />
          <Route
            path="/supervisor-dashboard"
            element={<SupervisorDashboardPage />}
          />
          <Route path="/carer-profile" element={<CarerProfilePage />} />
          <Route path="/patient-profile" element={<PatientsProfilePage />} />

          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/supervisor-assign" element={<SupervisorAssignPage />} />

          <Route path="/care-plan" element={<CarePlanPage />} />
          <Route path="/assignments" element={<SupervisorAssignPage />} />
          <Route path="/carer-calendar" element={<CarerCalendarPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-carer" element={<SupervisorCreateCarerPage />} />
        </>
      )}
    </Routes>
  );
};
