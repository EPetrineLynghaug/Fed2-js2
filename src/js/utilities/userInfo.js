/**
 * @function getUserInfo
 * @description Retrieves user information from local storage.
 * If user information exists, it is parsed from JSON and returned.
 * If no information is found, returns null.
 *
 * @returns {object|null} - Returns the parsed user information as an object or null if not found.
 */
export function getUserInfo() {
  const storeduserInfo = localStorage.getItem("userInfo");
  return storeduserInfo ? JSON.parse(storeduserInfo) : null;
}
/**
 * @function clearUserInfo
 * @description Clears user-related information from local storage.
 * This function removes the user token and user information.
 *
 * @returns {void} - This function does not return a value.
 */
export function clearUserInfo() {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
}
/**
 * @function isUserLoggedIn
 * @description Checks if the user is logged in by verifying the presence
 * of user information in local storage.
 *
 * @returns {boolean} - Returns true if the user is logged in; otherwise, false.
 */
export function isUserLoggedIn() {
  return !!localStorage.getItem("userInfo");
}
