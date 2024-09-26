import { authGuard } from "../../utilities/authGuard";
import { getUserInfo } from "../../utilities/userInfo";
import { readProfile } from "../../api/profile/read";
import createPostCards from "../../utilities/post-card";
authGuard();

const userInfo = getUserInfo();
const nameUrl = new URLSearchParams(window.location.search);
const name = nameUrl.get("name");

async function displayUserProfile(username) {
  const userProfile = await readProfile(username);

  if (userProfile) {
    const profile = document.querySelector(".profile");

    const profilName = document.createElement("p");
    profilName.innerText = userProfile.name;

    profile.append(profilName);

    if (userProfile.avatar) {
      const avatarImg = document.createElement("img");
      avatarImg.src = userProfile.avatar.url
        ? userProfile.avatar.url
        : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`;

      avatarImg.alt = userProfile.avatar.alt
        ? userProfile.avatar.alt
        : `${userProfile.name}'s avatar`;

      avatarImg.classList.add("avatar");
      profile.append(avatarImg);
    }

    if (userProfile.posts.length > 0) {
      const isAuthorized = userInfo.email === userProfile.email ? true : false;
      const articles = createPostCards(userProfile.posts, isAuthorized);

      document.querySelector(".posts").append(articles);
    }
  } else {
    document.querySelector(".user-name").innerText = "User not found";
  }
}

displayUserProfile(name);
