import { showCustomAlert } from "../utilities/customAlert.js";

/**
 * @function emailCheck
 * @description Validates an email address to ensure it is a valid Noroff student email.
 * The email must match the pattern `user@stud.noroff.no` or `user@noroff.no`.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid; otherwise, false.
 */
function emailCheck(email) {
  const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  return emailRegex.test(email);
}

/**
 * Validates a password to ensure it meets length and character requirements.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if valid; otherwise, false.
 */
function pswCheck(password) {
  const pswRegex = /^[a-zA-Z0-9]{8,20}$/;
  return pswRegex.test(password);
}

/**
 * Validates a name to ensure it only contains letters, numbers, underscores, and special characters.
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if valid; otherwise, false.
 */
function namecheck(name) {
  const nameRegex = /^[a-zA-Z0-9\W_]+$/;
  return name.length > 0 && nameRegex.test(name);
}

export { emailCheck, pswCheck, namecheck };
