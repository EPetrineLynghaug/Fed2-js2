import { headers } from "../headers";
import { API_AUTH_REGISTER } from "./../../api/constants";

/**
 * @async
 * @function register
 * @param {object} formData - The form data object containing registration details
 * @param {string} formData.name - The name of the user
 * @param {string} formData.email - The email address of the user
 * @param {string} formData.password - The password for the user
 * @returns {Promise<object>} result - The result of the registration request
 */
export async function register({ name, email, password }) {
  try {
    const reqBody = { name, email, password };

    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error or invalid JSON:", error.message);
    } else {
      console.error("Registration failed:", error.message);
    }
    throw error;
  }
}
