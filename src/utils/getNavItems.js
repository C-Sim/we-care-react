const navItems = {
  public: [
    { label: "About", path: "/about" },

    { label: "Login", path: "/login" },

    { label: "Sign Up", path: "/sign-up" },
  ],
  carer: [
    {
      label: "profile",
      path: "/carer-profile",
    },

    { label: "Notifications", path: "/carer-notifications" },

    { label: "Assignments", path: "/assignments" },

    { label: "Dashboard", path: "/carer-dashboard" },
  ],
  patient: [
    {
      label: "About",
      path: "/about",
    },

    { label: "Resources", path: "/resources" },

    { label: "profile", path: "/patient-profile" },

    { label: "Care Plan", path: "/care-plan" },

    { label: "Dashboard", path: "/patient-dashboard" },
  ],
  supervisor: [
    {
      label: "Notifications",
      path: "/supervisor-notifications",
    },
    { label: "Add Carer", path: "/create-carer" },

    { label: "Assignments", path: "/supervisor-assign" },

    { label: "Dashboard", path: "/supervisor-dashboard" },
  ],
};

export const getNavItems = (isLoggedIn, userType) => {
  if (!isLoggedIn) {
    return navItems.public;
  }

  return navItems[userType];
};
