//@ts-check
import { login } from "../../api/auth/login";
import { emailCheck, pswCheck } from "../../utilities/regex";
import { showCustomAlert } from "../../utilities/customAlert";

/**
 * @async
 * @function onLogin
 * @param {SubmitEvent} event - The submit event triggered by the login form.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 * @throws {Error} Throws an error if the email or password is invalid or if the login request fails.
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form ? form[0].value.trim() : "";
  const password = form ? form[1].value.trim() : "";

  // Check email validity and show alert if invalid
  if (!emailCheck(email)) {
    showCustomAlert(
      "Invalid email format. Please use a valid Noroff student email, such as 'user@stud.noroff.no' or 'user@noroff.no'.",
      "error"
    );
    return;
  }

  // Check password validity and show alert if invalid
  if (!pswCheck(password)) {
    showCustomAlert(
      "Invalid password. Password must be 8-20 characters long and can only include letters and numbers.",
      "error"
    );
    return;
  }

  try {
    // Attempt login with validated email and password
    const data = await login({ email, password });
    if (!data) {
      showCustomAlert(
        "Login failed. Please check your email and password and try again.",
        "error"
      );
      return;
    }

    // Store user data and redirect on successful login
    const user = {
      name: data.name,
      email: data.email,
      bio: data.bio,
      avatar: data.avatar,
      banner: data.banner,
    };

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userInfo", JSON.stringify(user));

    showCustomAlert(
      "Login successful! Redirecting to your dashboard...",
      "success"
    );
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
    // Show error alert if login fails unexpectedly
    showCustomAlert(
      "An unexpected error occurred during login. Please try again later.",
      "error"
    );
    console.error("Login error:", error);
  }
}
