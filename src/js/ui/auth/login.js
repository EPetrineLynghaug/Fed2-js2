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
  const email = form ? form[0].value : "";
  const password = form ? form[1].value : "";

  // Email and password validation with custom alert
  if (!emailCheck(email)) {
    showCustomAlert(
      "Invalid email. Must be a valid Noroff student email (stud.noroff.no) or (noroff.no).",
      "error"
    );
    return;
  }

  if (!pswCheck(password)) {
    showCustomAlert(
      "Invalid password. Must be at least 8 characters long.",
      "error"
    );
    return;
  }

  try {
    // Attempt login request
    const data = await login({ email, password });
    if (!data) {
      showCustomAlert("Login failed. Please try again.", "error");
      return;
    }

    // Store user data in localStorage
    const user = {
      name: data.name,
      email: data.email,
      bio: data.bio,
      avatar: data.avatar,
      banner: data.banner,
    };

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userInfo", JSON.stringify(user));

    // Display success alert with a delay before redirect
    showCustomAlert("Login successful!", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
    // Show error alert if login fails unexpectedly
    showCustomAlert(
      "An error occurred during login. Please try again later.",
      "error"
    );
    console.error("Login error:", error);
  }
}
