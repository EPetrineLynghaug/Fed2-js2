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
  const name = form ? form[0].value.trim() : "";
  const email = form ? form[1].value.trim() : "";
  const password = form ? form[2].value.trim() : "";

  // Individual field validations with specific alerts
  if (!namecheck(name)) {
    showCustomAlert(
      "Invalid name. It can contain letters, numbers, underscores, and special characters, but cannot be empty.",
      "error"
    );
    return;
  }

  if (!emailCheck(email)) {
    showCustomAlert(
      "Invalid email format. Please enter a valid Noroff student email, such as 'user@stud.noroff.no' or 'user@noroff.no'.",
      "error"
    );
    return;
  }

  if (!pswCheck(password)) {
    showCustomAlert(
      "Invalid password. Password must be 8-20 characters long and can only include letters and numbers.",
      "error"
    );
    return;
  }

  const formData = { name, email, password };

  try {
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
  } catch (error) {
    console.error("Registration error:", error);
    showCustomAlert(
      "An unexpected error occurred during registration. Please try again later.",
      "error"
    );
  }
}
