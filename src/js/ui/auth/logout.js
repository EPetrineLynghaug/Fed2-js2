/**
 * @function onLogout
 * @param {Event} event - The event object representing the logout action.
 * @description Handles the logout process by removing the user's token and information from local storage,
 * and then redirects the user to the login page.
 */
export function onLogout(event) {
  event.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  window.location.href = "/auth/login/";
}
