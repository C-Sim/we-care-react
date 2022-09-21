const navItems = {
  public: [
    { label: "About", path: "/about" },

    { label: "Login", path: "/login" },

    { label: "Sign Up", path: "/sign-up" },
  ],
  carer: [
    {
      label: "Profile",
      path: "/carer-profile",
    },

    // { label: "Notifications", path: "/notifications" },

    { label: "Calendar", path: "/carer-calendar" },

    { label: "Dashboard", path: "/carer-dashboard" },
  ],
  patient: [
    {
      label: "About",
      path: "/about",
    },

    { label: "Profile", path: "/patient-profile" },

    { label: "Care Plan", path: "/care-plan" },

    { label: "Dashboard", path: "/patient-dashboard" },
  ],
  supervisor: [
    // {
    //   label: "Notifications",
    //   path: "/notifications",
    // },
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
