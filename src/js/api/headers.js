// @ts-check
import { API_KEY } from "./constants";

/**
 * @function headers
 * @description Creates and returns a Headers object with necessary HTTP headers for API requests.
 * @returns {Headers} A Headers object with the following headers:
 * - `Content-Type`: application/json
 * - `X-Noroff-API-Key`: The API key if it is available.
 * - `Authorization`: Bearer token from local storage if it exists.
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
