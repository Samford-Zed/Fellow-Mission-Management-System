export function createPageUrl(page) {
  const map = {
    // Public
    LandingPage: "/",
    Register: "/app/Register",
    SignIn: "/app/SignIn",

    // Dashboards
    UserDashboard: "/app/user/dashboard",
    AdminDashboard: "/app/admin/dashboard",

    // Other pages
    FillForm: "/app/FillForm",
  };

  return map[page] || "/";
}
