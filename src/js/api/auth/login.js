import { headers } from "../headers";
import { API_AUTH_LOGIN } from "./../../api/constants";
/**
 * @async
 * @function login
 * @param {Object "form"} - The form object
 * @property {string "form.name"}  - The email of the user
 * @property {string "form.password"} - The password of the user
 * @returns {Promise<object>} result - The result of the login
 */
export async function login({ email, password }) {
  try {
    const reqBody = {
      email: email,
      password: password,
    };

    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(reqBody),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error.message);
  }
}
