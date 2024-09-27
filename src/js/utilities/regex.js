/**
 * @function emailCheck
 * @description Validates an email address to ensure it is a valid Noroff student email.
 * The email must match the pattern `user@stud.noroff.no` or `user@noroff.no`.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid; otherwise, false.
 */
function emailCheck(email) {
  const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  let emailMatch = emailRegex.test(email);

  if (!emailMatch) {
    alert("Epost ikke gylding, må være en stud.noroff.no epost");
    return false;
  }
  return true;
}

/**
 * @function pswCheck
 * @description Validates a password to ensure it meets length requirements.
 * The password must be between 8 and 20 characters long and can contain letters and numbers.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid; otherwise, false.
 */
function pswCheck(password) {
  const pswRegex = /[a-zA-Z0-9]{8,20}/g;
  let pswMatch = pswRegex.test(password);
  if (!pswMatch) {
    alert("Passord ikke gylding, må være minst 8 tegn");
    return false;
  }
  return true;
}

/**
 * @function namecheck
 * @description Validates a name to ensure it only contains letters and underscores.
 * The name can include both uppercase and lowercase letters and underscores.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if the name is valid; otherwise, false.
 */
function namecheck(name) {
  const nameRegex = /^[a-zA-Z\_]+$/;
  let nameMatch = nameRegex.test(name);
  if (!nameMatch) {
    alert("Navn ikke gyldig,kan bare inneholde små/store bokstaver a-Z og _");
    return false;
  }
  return true;
}

export { emailCheck, pswCheck, namecheck };
