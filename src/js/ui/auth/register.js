// @ts-check

import { register } from "../../api/auth/register";
import { emailCheck, pswCheck, namecheck } from "../../utilities/regex";
import { showCustomAlert } from "../../utilities/customAlert";

/**
 * @function onRegister
 * @description Handles the registration event by preventing the default form submission,
 * extracting user input from the form fields, validating, and handling the registration process.
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<void>} This function does not return a value.
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const name = form ? form[0].value : "";
  const email = form ? form[1].value : "";
  const password = form ? form[2].value : "";

  if (!emailCheck(email) || !pswCheck(password) || !namecheck(name)) {
    showCustomAlert(
      "Please ensure all fields are filled out correctly.",
      "error"
    );
    return;
  }

  const formData = {
    name,
    email,
    password,
  };

  const result = await register(formData);

  if (result) {
    showCustomAlert(
      "Your account has been successfully created! Redirecting to login...",
      "success"
    );
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1500);
  } else {
    showCustomAlert(
      "Unable to complete registration. Please try again later.",
      "error"
    );
  }
}
