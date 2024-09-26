import { onLogout } from "../ui/auth/logout";
import { getUserInfo } from "../utilities/userInfo";
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
