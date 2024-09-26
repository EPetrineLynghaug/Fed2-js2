import { readPost, readPosts } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";
import { getUserInfo } from "../../utilities/userInfo";
import createPostCards from "../../utilities/post-card";

authGuard();

const userInfo = getUserInfo();
const name = userInfo.name;

document.querySelector(".welcomeUser").innerHTML = name || "Annonymus";

const Allposts = await readPosts();

const articles = createPostCards(Allposts, false);

document.querySelector(".posts").append(articles);
