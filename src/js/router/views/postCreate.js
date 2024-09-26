import navbar from "../../components/navbar";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();
navbar();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
