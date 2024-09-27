import { authGuard } from "../../utilities/authGuard";
import { getUserInfo } from "../../utilities/userInfo";
import { readProfile } from "../../api/profile/read";
import createPostCards from "../../utilities/post-card";
import navbar from "../../components/navbar";
authGuard();
navbar();

const userInfo = getUserInfo();
const nameUrl = new URLSearchParams(window.location.search);
const name = nameUrl.get("name");
/**
 * Displays the user profile for a given username by fetching the profile data,
 * creating DOM elements to display the user's name, avatar, and posts.
 * @async
 * @function displayUserProfile
 * @param {string} username - The username of the user whose profile is to be displayed.
 * @returns {Promise<void>} - A promise that resolves when the profile is displayed.
 */
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
