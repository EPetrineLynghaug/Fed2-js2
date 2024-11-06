import { showCustomAlert } from "./customAlert";

export function authGuard() {
  // Check if a token exists in localStorage, indicating the user is authenticated
  if (!localStorage.token) {
    showCustomAlert("You must be logged in to view this page", "error");
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1500);
  }
}
