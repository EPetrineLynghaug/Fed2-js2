import navbar from "../../components/navbar";
import { onRegister } from "../../ui/auth/register";

navbar();
const form = document.forms.register;

form.addEventListener("submit", onRegister);
