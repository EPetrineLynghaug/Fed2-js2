import { onDeletePost } from "../ui/post/delete";

/**
 * @function createPostCards
 * @description Generates a container of post cards based on the provided user posts.
 * Each post card includes details like the author's name, title, body, tags,
 * creation date, and media. It also provides buttons for reading, editing,
 * and deleting posts based on the user's authorization status.
 *
 * @param {Array<object>} userPosts - An array of post objects, where each post
 *                                     contains details such as title, body,
 *                                     author, tags, created date, and media.
 * @param {boolean} isAuthorized - A flag indicating whether the user has
 *                                 authorization to edit or delete posts.
 * @returns {HTMLElement} The container element holding all the generated post cards.
 */

export default function createPostCards(userPosts, isAuthorized) {
  const articlesContainer = document.createElement("div");
  articlesContainer.className =
    "min-w-100 w-full max-w-screen-xl gap-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const placeholderImageUrl =
    "https://via.placeholder.com/400x300?text=No+Image+Available";

  userPosts.forEach((post) => {
    const articleContainer = document.createElement("div");
    articleContainer.className =
      "rounded-lg p-4 flex flex-col justify-between w-full max-w-md mx-auto border border-gray-600";
    articleContainer.style.borderRadius = "18px";
    articleContainer.style.borderColor = "#444";
    articleContainer.classList.add("min-h-[500px]");

    const userInfoDiv = document.createElement("div");
    userInfoDiv.className =
      "user-info mb-3 flex items-center font-semibold text-gray-200";

    if (post.author) {
      const author = document.createElement("a");
      author.href = `/profile/?name=${post.author.name}`;
      author.innerText = post.author.name;
      author.className =
        "text-purple-400 hover:underline transition duration-200 ease-in-out";
      userInfoDiv.append(author);
    }

    const articleBody = document.createElement("div");
    articleBody.className =
      "article-body space-y-3 overflow-hidden relative flex flex-col"; 

    const articleTitle = document.createElement("h2");
    articleTitle.innerText = post.title;
    articleTitle.className = "text-lg font-bold truncate text-gray-200";
    articleBody.append(articleTitle);

    const articleText = document.createElement("p");
    const truncatedText = post.body.split(". ").slice(0, 2).join(". ") + ".";
    articleText.innerText =
      truncatedText.length > 100
        ? truncatedText.substring(0, 100) + "..."
        : truncatedText;
    articleText.className = "text-sm leading-relaxed text-gray-400";
    articleBody.append(articleText);

    const articleTags = document.createElement("p");
    articleTags.className =
      "tags flex flex-wrap gap-1 mt-2 text-xs text-gray-400";

    // Ensure at least 3 tags by adding placeholders if needed
    const tagsToDisplay = post.tags.slice(0, 3);
    while (tagsToDisplay.length < 3) {
      tagsToDisplay.push("Placeholder");
    }

    tagsToDisplay.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.innerText = `#${tag}`;
      tagSpan.className = "px-2 py-1 rounded-full bg-gray-800 text-gray-200";
      articleTags.append(tagSpan);
    });
    articleBody.append(articleTags);

    const dateDiv = document.createElement("div");
    dateDiv.className = "post-date text-xs text-gray-400";
    const date = new Date(post.created);
    dateDiv.innerText = `Posted on: ${date.toLocaleDateString()}`;
    articleBody.append(dateDiv);

    const mediaDiv = document.createElement("div");
    mediaDiv.className = "media-container mt-4 h-48 rounded-lg overflow-hidden";

    const img = document.createElement("img");
    img.src =
      post.media && post.media.url ? post.media.url : placeholderImageUrl;
    img.alt =
      post.media && post.media.alt ? post.media.alt : "Placeholder image";
    img.className = "w-full h-full object-cover rounded-md";
    mediaDiv.append(img);

    articleBody.append(mediaDiv);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "button-container flex gap-2 mt-2";

    const baseButtonClasses =
      "text-white font-medium px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded focus:outline-none focus:ring-1 focus:ring-offset-1 transition-colors duration-150 ease-in-out";

    const articleBtn = document.createElement("button");
    articleBtn.innerText = "Read Post";
    articleBtn.className = `${baseButtonClasses} bg-teal-500 hover:bg-teal-600`;
    articleBtn.addEventListener("click", () => {
      window.location.href = `/post/single-post/?id=${post.id}`;
    });
    buttonDiv.append(articleBtn);

    if (isAuthorized) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className = `${baseButtonClasses} bg-purple-400 hover:bg-purple-500`;
      editBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location.href = `/post/edit/?id=${post.id}`;
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.className = `${baseButtonClasses} bg-red-500 hover:bg-red-600`;
      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        await onDeletePost(articleContainer, post.id);
      });

      buttonDiv.append(editBtn, deleteBtn);
    }

    articleBody.append(buttonDiv);
    articleContainer.append(userInfoDiv, articleBody);
    articlesContainer.append(articleContainer);
  });

  return articlesContainer;
}
