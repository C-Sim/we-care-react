import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./containers/LandingPage";
import { LoginPage } from "./containers/LoginPage";
import { SignUpPage } from "./containers/SignUpPage";
import { CarerDashboardPage } from "./containers/CarerDashboardPage";
import { PatientDashboardPage } from "./containers/PatientDashboardPage";
import { SupervisorDashboardPage } from "./containers/SupervisorDashboardPage";
import { AboutPage } from "./containers/AboutPage";
import { AssignmentsPage } from "./containers/AssignmentsPage";
import { CarerAssignmentsPage } from "./containers/CarerAssignmentsPage";

import { CareOverviewPage } from "./containers/CareOverviewPage";
import { CarePlanPage } from "./containers/CarePlanPage";
import { CarerNotificationsPage } from "./containers/CarerNotificationsPage";
import { NotificationsPage } from "./containers/NotificationsPage";
import { SupervisorCreateCarerPage } from "./containers/SupervisorCreateCarerPage";
import { SupervisorAssignPage } from "./containers/SupervisorAssignPage";
import { PatientsPage } from "./containers/PatientsPage";
import { ResourcesPage } from "./containers/ResourcesPage";
import { CarerProfilePage } from "./containers/CarerProfilePage";
import { PatientsProfilePage } from "./containers/PatientProfilePage";
import { useAuth } from "./context/AppProvider";

export const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
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

          <Route
            path="/carer-notifications"
            element={<CarerNotificationsPage />}
          />
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/carer-assignments" element={<CarerAssignmentsPage />} />

          <Route path="/supervisor-assign" element={<SupervisorAssignPage />} />

          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/care-overview" element={<CareOverviewPage />} />
          <Route path="/care-plan" element={<CarePlanPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
        </>
      )}
    </Routes>
  );
};
