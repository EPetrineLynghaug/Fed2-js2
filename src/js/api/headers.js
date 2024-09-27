import { API_KEY } from "./constants";

/**
 * @function headers
 * @description Creates and returns a Headers object with necessary HTTP headers for API requests.
 * @returns {Headers} - Returns a Headers object.
 * @throws {Error} - Throws an error if API_KEY is not defined.
 */
export function headers() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const token = localStorage.getItem("token");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
