// @ts-check

import { register } from "../../api/auth/register";
import { emailCheck, pswCheck, namecheck } from "../../utilities/regex";
/**
 * @function onRegister
 * @description Handles the registration event by preventing the default form submission,
 * extracting user input from the form fields, and logging the input data.
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<void>} This function does not return a value.
 */
export async function onRegister(event) {
  event.preventDefault();
  console.log(event);

  const form = event.target;
  const name = form ? form[0].value : "";
  const email = form ? form[1].value : "";
  const password = form ? form[2].value : "";

  console.log(email);

  if (!emailCheck(email) || !pswCheck(password) || !namecheck(name)) {
    return;
  }
  /**
   * @function handleRegistration
   * @description Handles the user registration process by collecting form data,
   * sending it to the register function, and redirecting the user upon success.
   * @param {string} name - The name of the user being registered.
   * @param {string} email - The email address of the user being registered.
   * @param {string} password - The password for the user being registered.
   * @returns {Promise<void>} A promise that resolves when the registration is complete.
   */
  const formData = {
    name,
    email,
    password,
  };

  console.log(formData);

  const result = await register(formData);

  alert("Registration successful!");
  console.log("Registration data:", result);

  window.location.href = "/auth/login/";
}
