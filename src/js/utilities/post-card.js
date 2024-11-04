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
    "min-w-100 w-100 max-w-screen-xl gap-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  // Maks tre kolonner på store skjermer, med økende padding på større skjermer

  userPosts.forEach((post) => {
    const articleContainer = document.createElement("div");
    articleContainer.className =
      "bg-backgroundCard rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 w-full max-w-md mx-auto";
    // Setter maksimal bredde for å unngå at kortene blir for brede

    const userInfoDiv = document.createElement("div");
    userInfoDiv.className =
      "user-info mb-4 flex items-center text-textPrimary font-semibold";

    if (post.author) {
      const author = document.createElement("a");
      author.href = `/profile/?name=${post.author.name}`;
      author.innerText = post.author.name;
      author.className = "text-linkColor hover:underline";
      userInfoDiv.append(author);
    }

    const articleBody = document.createElement("div");
    articleBody.className = "article-body flex-grow space-y-4 overflow-hidden";

    const articleTitle = document.createElement("h2");
    articleTitle.innerText = post.title;
    articleTitle.className = "text-xl font-bold text-textPrimary truncate";
    articleBody.append(articleTitle);

    const articleText = document.createElement("p");
    articleText.innerText = post.body;
    articleText.className =
      "text-textSecondary text-sm leading-relaxed line-clamp-4";
    articleBody.append(articleText);

    const articleTags = document.createElement("p");
    articleTags.className =
      "tags flex flex-wrap gap-2 mt-4 text-xs text-warmGray";
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.innerText = `#${tag}`;
      tagSpan.className = "bg-gray-700 px-3 py-1 rounded-full text-softWhite";
      articleTags.append(tagSpan);
    });
    articleBody.append(articleTags);

    const dateDiv = document.createElement("div");
    dateDiv.className = "post-date text-xs text-warmGray mt-6";
    const date = new Date(post.created);
    dateDiv.innerText = `Posted on: ${date.toLocaleDateString()}`;
    articleBody.append(dateDiv);

    // Håndtering av media (bilde)
    const mediaDiv = document.createElement("div");
    if (post.media && post.media.url) {
      mediaDiv.className =
        "media-container mt-4 rounded-lg overflow-hidden h-48";
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.className = "w-full h-full object-cover rounded-md";
      mediaDiv.append(img);
    } else {
      // Placeholder for innlegg uten bilde
      mediaDiv.className =
        "media-container mt-4 h-48 flex items-center justify-center bg-gray-800 text-softWhite rounded-lg";
      mediaDiv.innerText = "No image available";
    }
    articleBody.append(mediaDiv);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "button-container flex gap-3 mt-6";

    const articlebtn = document.createElement("button");
    articlebtn.innerText = "Read Post";
    articlebtn.className =
      "bg-primaryTeal text-softWhite px-5 py-2 rounded-md hover:bg-tealDark";
    articlebtn.addEventListener("click", () => {
      window.location.href = `/post/single-post/?id=${post.id}`;
    });
    buttonDiv.append(articlebtn);

    if (isAuthorized) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className =
        "bg-tealLight text-softWhite px-5 py-2 rounded-md hover:bg-tealDark";
      editBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location.href = `/post/edit/?id=${post.id}`;
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.className =
        "bg-complementaryCoral text-softWhite px-5 py-2 rounded-md hover:bg-coralDark";
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
