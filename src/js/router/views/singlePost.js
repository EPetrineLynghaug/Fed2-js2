import navbar from "../../components/navbar";
import { onSinglePost } from "../../ui/post/single";
navbar();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

onSinglePost(id);
