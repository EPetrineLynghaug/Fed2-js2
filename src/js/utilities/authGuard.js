import { showCustomAlert } from "./customAlert";

export function authGuard() {
  if (!localStorage.token) {
    showCustomAlert("You must be logged in to view this page", "error");
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1500);
  }
}
