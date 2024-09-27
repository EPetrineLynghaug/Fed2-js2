import { onLogout } from "../ui/auth/logout";
import { getUserInfo } from "../utilities/userInfo";
/**
 * @function navbar
 * @description Creates and renders a navigation bar based on the user's authentication status.
 * - If a token exists in localStorage, it displays menu items for authenticated users:
 *   - Home
 *   - New Post
 *   - My Profile
 * - If no token is found, it displays menu items for unauthenticated users:
 *   - Login
 *   - Register
 * The navbar includes a Logout button for authenticated users.
 * @returns {void} This function does not return a value.
 */
let meny;
if (localStorage.token) {
  const user = getUserInfo();

  meny = [
    {
      name: "Home",
      url: "/",
    },

    {
      name: "New Post",
      url: "/post/create/",
    },
    {
      name: "My Profile",
      url: `/profile/?name=${user.name}`,
    },
  ];
} else {
  meny = [
    {
      name: "Login",
      url: "/auth/login/",
    },
    {
      name: "Register",
      url: "/auth/register/",
    },
  ];
}

export default function navbar() {
  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  const branding = document.createElement("div");
  branding.classList.add("branding");

  const menu = document.createElement("div");
  menu.classList.add("menu");

  const logout = document.createElement("button");
  logout.innerText = "Logout";
  logout.addEventListener("click", onLogout);

  meny.map((item) => {
    const atag = document.createElement("a");
    atag.href = item.url;
    atag.innerText = item.name;

    menu.append(atag);
  });
  menu.append(logout);
  nav.append(branding, menu);

  document.body.prepend(nav);
}
