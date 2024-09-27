//@ts-check
import { login } from "../../api/auth/login";
import { emailCheck, pswCheck } from "../../utilities/regex";

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
  const email = form ? form[0].value : ""; //inline if else.
  const password = form ? form[1].value : "";

  if (!emailCheck(email) || !pswCheck(password)) {
    return;
  }

  const data = await login({ email, password });
  if (!data) return;

  console.log(data);

  const user = {
    name: data.name,
    email: data.email,
    bio: data.bio,
    avatar: data.avatar,
    banner: data.banner,
  };

  localStorage.setItem("token", data.accessToken);

  localStorage.setItem("userInfo", JSON.stringify(user));

  window.location.href = "/";
}
