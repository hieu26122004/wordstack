export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  learn: "/learn",
  profile: "/profile",
};

export const APP_NAME = "Wordstack";

export const SERVER_URL = import.meta.env.DEV ? "http://localhost:8000" : "";

export const HEADER_NAV_LINKs = [
  { id: "header-nav-1", text: "Stack", url: paths.home },
  { id: "header-nav-2", text: "Learn", url: paths.learn },
  { id: "header-nav-3", text: "Profile", url: paths.profile },
];

export const FOOTER_NAV_LINKs = [
  { id: "footer-nav-1", text: "About", url: "#" },
  { id: "footer-nav-2", text: "Terms of Use", url: "#" },
  { id: "footer-nav-3", text: "Contact", url: "#" },
];
