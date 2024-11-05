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
    "min-w-100 w-100 max-w-screen-xl gap-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const placeholderImageUrl =
    "https://via.placeholder.com/400x300?text=No+Image+Available";

  userPosts.forEach((post) => {
    const articleContainer = document.createElement("div");
    articleContainer.className =
      "rounded-lg p-4 flex flex-col justify-between transition-transform transform w-full max-w-md mx-auto border border-gray-600";
    articleContainer.style.borderRadius = "18px"; 
    articleContainer.style.borderColor = "#444"; 
    articleContainer.style.transition = "transform 0.15s ease";
    articleContainer.addEventListener("mouseover", () => {
      articleContainer.style.transform = "scale(1.01)";
    });
    articleContainer.addEventListener("mouseout", () => {
      articleContainer.style.transform = "scale(1)";
    });

    const userInfoDiv = document.createElement("div");
    userInfoDiv.className = "user-info mb-3 flex items-center font-semibold";
    userInfoDiv.style.color = "#E0E0E0";

    if (post.author) {
      const author = document.createElement("a");
      author.href = `/profile/?name=${post.author.name}`;
      author.innerText = post.author.name;
      author.className = "hover:underline transition duration-200 ease-in-out";
      author.style.color = "#BB86FC"; 
      userInfoDiv.append(author);
    }

    const articleBody = document.createElement("div");
    articleBody.className =
      "article-body flex-grow space-y-3 overflow-hidden relative";

    const articleTitle = document.createElement("h2");
    articleTitle.innerText = post.title;
    articleTitle.className = "text-lg font-bold truncate";
    articleTitle.style.color = "#E0E0E0"; 
    articleBody.append(articleTitle);

    // Limit the text to two sentences, adding ellipsis if necessary
    const articleText = document.createElement("p");
    const truncatedText = post.body.split(". ").slice(0, 2).join(". ") + ".";
    articleText.innerText =
      truncatedText.length > 100
        ? truncatedText.substring(0, 100) + "..."
        : truncatedText;
    articleText.className = "text-sm leading-relaxed overflow-hidden";
    articleText.style.color = "#A0A0A0"; 
    articleBody.append(articleText);

    const articleTags = document.createElement("p");
    articleTags.className = "tags flex flex-wrap gap-1 mt-2 text-xs";
    articleTags.style.color = "#A0A0A0";
    post.tags.slice(0, 3).forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.innerText = `#${tag}`;
      tagSpan.className = "px-2 py-1 rounded-full";
      tagSpan.style.backgroundColor = "#252525"; 
      tagSpan.style.color = "#E0E0E0";
      articleTags.append(tagSpan);
    });
    articleBody.append(articleTags);

    if (post.tags.length > 3) {
      const moreTags = document.createElement("span");
      moreTags.innerText = `+${post.tags.length - 3} more`;
      moreTags.className = "px-2 py-1 rounded-full cursor-pointer";
      moreTags.style.backgroundColor = "#252525"; 
      moreTags.style.color = "#E0E0E0";
      moreTags.addEventListener("mouseover", () => {
        const tooltip = document.createElement("div");
        tooltip.className = "absolute text-xs rounded p-2 mt-2";
        tooltip.style.backgroundColor = "#1E1E1E";
        tooltip.style.color = "#E0E0E0";
        tooltip.innerText = post.tags
          .slice(3)
          .map((tag) => `#${tag}`)
          .join(" ");
        moreTags.appendChild(tooltip);
      });
      moreTags.addEventListener("mouseout", () => {
        if (moreTags.lastChild) moreTags.removeChild(moreTags.lastChild);
      });
      articleTags.append(moreTags);
    }

    const dateDiv = document.createElement("div");
    dateDiv.className = "post-date text-xs mt-4";
    dateDiv.style.color = "#A0A0A0"; 
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
    buttonDiv.className = "button-container flex gap-2 mt-4";

    // Base styles for buttons
    const baseButtonClasses =
      "text-white font-medium px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-offset-1 transition-colors duration-150 ease-in-out";

    const articleBtn = document.createElement("button");
    articleBtn.innerText = "Read Post";
    articleBtn.className = baseButtonClasses;
    articleBtn.style.backgroundColor = "#03DAC6";
    articleBtn.style.color = "#FFFFFF";
    articleBtn.addEventListener("click", () => {
      window.location.href = `/post/single-post/?id=${post.id}`;
    });
    buttonDiv.append(articleBtn);

    if (isAuthorized) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className = baseButtonClasses;
      editBtn.style.backgroundColor = "#BB86FC";
      editBtn.style.color = "#FFFFFF";
      editBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location.href = `/post/edit/?id=${post.id}`;
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.className = baseButtonClasses;
      deleteBtn.style.backgroundColor = "#CF6679";
      deleteBtn.style.color = "#FFFFFF";
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
