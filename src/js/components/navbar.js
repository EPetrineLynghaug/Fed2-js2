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
  nav.classList.add(
    "bg-backgroundDark",
    "p-4",
    "flex",
    "justify-between",
    "items-center",
    "shadow-md",
    "fixed", // Fixed positioning
    "top-0", // Stick to the top
    "left-0", // Align to the left
    "w-full", // Full width
    "z-50" // Ensures it stays above other content
  );

  const branding = document.createElement("div");
  branding.classList.add("text-white", "font-bold", "text-xl");
  branding.innerText = "My Application"; // Add your branding text or logo

  const menu = document.createElement("div");
  menu.classList.add("menu", "flex", "gap-4");

  meny.map((item) => {
    const atag = document.createElement("a");
    atag.href = item.url;
    atag.innerText = item.name;
    atag.classList.add(
      "text-softWhite",
      "hover:text-linkColor",
      "transition-colors",
      "duration-200"
    );

    menu.append(atag);
  });

  // Only add the Logout button if the user is authenticated
  if (localStorage.token) {
    const logout = document.createElement("button");
    logout.innerText = "Logout";
    logout.classList.add(
      "bg-complementaryCoral",
      "text-softWhite",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-coralDark",
      "transition-colors",
      "duration-200"
    );
    logout.addEventListener("click", onLogout);
    menu.append(logout);
  }

  nav.append(branding, menu);
  document.body.prepend(nav);
}
