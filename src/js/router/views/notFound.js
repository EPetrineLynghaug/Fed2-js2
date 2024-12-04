import navbar from "../../components/navbar";
import { showCustomAlert } from "../../utilities/customAlert";

await showCustomAlert(
  "Page not found. Please check the URL and try again.",
  "error"
);
navbar();
