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
    { name: "Home", url: "/" },
    { name: "New Post", url: "/post/create/" },
    { name: "My Profile", url: `/profile/?name=${user.name}` },
  ];
} else {
  meny = [
    { name: "Login", url: "/auth/login/" },
    { name: "Register", url: "/auth/register/" },
  ];
}

export default function navbar() {
  // Main navigation bar container
  const nav = document.createElement("nav");
  nav.classList.add(
    "bg-backgroundDark",
    "p-4",
    "flex",
    "justify-between",
    "items-center",
    "shadow-md",
    "w-full",
    "z-50",
    "fixed",
    "top-0"
  );

  // Branding
  const branding = document.createElement("div");
  branding.classList.add("text-white", "font-bold", "text-xl");
  branding.innerText = "My Application";

  // Menu container for tablet/desktop view
  const menu = document.createElement("div");
  menu.classList.add("hidden", "sm:flex", "gap-6", "items-center", "ml-auto");

  //  Menu items with horizontal layout for tablet/desktop
  meny.forEach((item) => {
    const atag = document.createElement("a");
    atag.href = item.url;
    atag.innerText = item.name;
    atag.classList.add(
      "text-gray-300",
      "font-semibold",
      "hover:text-teal-400",
      "transition-colors",
      "duration-200",
      "py-2",
      "px-4",
      "rounded"
    );
    menu.append(atag);
  });

  // Add Logout button if user is authenticated
  if (localStorage.token) {
    const logout = document.createElement("button");
    logout.innerText = "Logout";
    logout.classList.add(
      "bg-red-500",
      "text-white",
      "font-semibold",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-red-700",
      "transition-colors",
      "duration-200"
    );
    logout.addEventListener("click", onLogout);
    menu.append(logout);
  }

  // Hamburger icon for mobile menu toggle
  const hamburger = document.createElement("button");
  hamburger.id = "menu-btn";
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.add("sm:hidden", "cursor-pointer", "text-white");
  hamburger.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  `;

  // Mobile menu container with rounded style on right side
  const mobileMenu = document.createElement("div");
  mobileMenu.id = "nav-menu-mobile";
  mobileMenu.classList.add(
    "hidden",
    "absolute",
    "top-0",
    "right-0",
    "mt-16",
    "bg-backgroundDark",
    "rounded-l-lg",
    "w-3/4",
    "max-w-xs",
    "flex",
    "flex-col",
    "gap-2",
    "p-4",
    "shadow-lg",
    "sm:hidden"
  );

  // Populate mobile menu with items
  meny.forEach((item) => {
    const mobileLink = document.createElement("a");
    mobileLink.href = item.url;
    mobileLink.innerText = item.name;
    mobileLink.classList.add(
      "text-gray-300",
      "font-semibold",
      "hover:bg-teal-600",
      "hover:text-white",
      "transition-colors",
      "duration-200",
      "py-2",
      "px-4",
      "rounded-md"
    );
    mobileMenu.append(mobileLink);
  });

  // Styled Logout button for mobile menu if authenticated
  if (localStorage.token) {
    const mobileLogout = document.createElement("button");
    mobileLogout.innerText = "Logout";
    mobileLogout.classList.add(
      "text-gray-300",
      "font-semibold",
      "bg-red-500",
      "hover:bg-red-700",
      "hover:text-white",
      "transition-colors",
      "duration-200",
      "py-2",
      "px-4",
      "rounded-md",
      "w-full",
      "text-left"
    );
    mobileLogout.addEventListener("click", onLogout);
    mobileMenu.append(mobileLogout);
  }

  // Append branding, hamburger, and both menus to the navbar
  nav.append(branding, hamburger, menu, mobileMenu);
  document.body.prepend(nav);

  // Toggle functionality for mobile menu
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const expanded =
      hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
  });
}
