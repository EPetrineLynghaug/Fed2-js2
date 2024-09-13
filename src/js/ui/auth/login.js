//@ts-check
import { login } from "../../api/auth/login";
import { emailCheck, pswCheck } from "../../utilities/regex";

/**
 * @function onLogin
 * @param {Event} event
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
  console.log(data);

  localStorage.setItem("token", data.accessToken);

  window.location.href = "/";
}
//TODO: Hente ut brukerdata.
