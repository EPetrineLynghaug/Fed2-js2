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

    // Set main profile container layout
    profile.classList.add(
      "min-w-100",
      "w-full",
      "max-w-screen-xl",
      "py-8",
      "px-4",
      "mx-auto"
    );

    // Inner container for avatar and name
    const profileContainer = document.createElement("div");
    profileContainer.classList.add(
      "flex",
      "items-center",
      "justify-start",
      "space-x-4",
      "w-full",
      "max-w-md"
    );

    // Avatar image
    if (userProfile.avatar) {
      const avatarImg = document.createElement("img");
      avatarImg.src = userProfile.avatar.url
        ? userProfile.avatar.url
        : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`;

      avatarImg.alt = userProfile.avatar.alt
        ? userProfile.avatar.alt
        : `${userProfile.name}'s avatar`;

      avatarImg.classList.add(
        "w-10",
        "h-10",
        "sm:w-12",
        "sm:h-12",
        "md:w-16",
        "md:h-16",
        "rounded-full",
        "object-cover",
        "border-2",
        "border-gray-400"
      );
      profileContainer.append(avatarImg);
    }

    // Profile name
    const profileName = document.createElement("p");
    profileName.innerText = userProfile.name;
    profileName.classList.add(
      "text-base",
      "sm:text-lg",
      "md:text-xl",
      "font-semibold",
      "text-textPrimary"
    );

    profileContainer.append(profileName);
    profile.append(profileContainer);

    // Display user posts if available
    if (userProfile.posts.length > 0) {
      const isAuthorized = userInfo.email === userProfile.email;
      const articles = createPostCards(userProfile.posts, isAuthorized);
      document.querySelector(".posts").append(articles);
    }
  } else {
    const profile = document.querySelector(".profile");
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "User not found";
    errorMessage.classList.add("text-md", "font-semibold", "text-red-500", "text-center");
    profile.append(errorMessage);
  }
}

displayUserProfile(name);
