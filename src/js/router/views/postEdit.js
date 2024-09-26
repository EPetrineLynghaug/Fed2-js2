import { readPost } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";
import navbar from "../../components/navbar";

authGuard();
navbar();
const id = new URLSearchParams(window.location.search).get("id");
const post = await readPost(id);
if (post) {
  document.querySelector('input[name="title"]').value = post.title || "";
  document.querySelector('textarea[name="body"]').value = post.body || "";
  document.querySelector('input[name="tags"]').value = post.tags
    ? post.tags.join(" ")
    : "";
  document.querySelector('input[name="media"]').value = post.media
    ? post.media.url
    : "";
}
const form = document.forms.editPost;

form.addEventListener("submit", (event) => onUpdatePost(event, id));
