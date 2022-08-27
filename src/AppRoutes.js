import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./containers/LandingPage";
import { LoginPage } from "./containers/LoginPage";
import { SignUpPage } from "./containers/SignUpPage";
import { DashboardPage } from "./containers/DashboardPage";
import { AboutPage } from "./containers/AboutPage";
import { AssignmentsPage } from "./containers/AssignmentsPage";
import { CareOverviewPage } from "./containers/CareOverviewPage";
import { CarePlanPage } from "./containers/CarePlanPage";
import { NotificationsPage } from "./containers/NotificationsPage";
import { PatientsPage } from "./containers/PatientsPage";
import { ResourcesPage } from "./containers/ResourcesPage";

import { useAuth } from "./context/AppProvider";

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
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
