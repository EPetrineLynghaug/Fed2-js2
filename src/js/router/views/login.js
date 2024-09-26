import { login } from "../../api/auth/login";
import navbar from "../../components/navbar";
import { onLogin } from "../../ui/auth/login";

navbar();
const form = document.forms.login;

form.addEventListener("submit", onLogin);
