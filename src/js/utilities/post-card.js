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
    "articles-container grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3"; // Tailwind classes for layout

  userPosts.forEach((post) => {
    const articleContainer = document.createElement("div");
    articleContainer.className =
      "article-Container bg-backgroundCard rounded-lg shadow-lg p-4 flex flex-col justify-between"; // Added Tailwind classes

    const userInfoDiv = document.createElement("div");
    userInfoDiv.className =
      "user-Info mb-2 flex items-center text-textPrimary font-medium"; // Added Tailwind classes

    if (post.author) {
      const author = document.createElement("a");
      author.href = `/profile/?name=${post.author.name}`;
      author.innerText = post.author.name;
      author.className = "text-linkColor hover:underline"; // Added Tailwind classes for link
      userInfoDiv.append(author);
    }

    const articleBody = document.createElement("div");
    articleBody.className = "article-Body flex-grow space-y-2"; // Added Tailwind classes

    const articleTitle = document.createElement("h2");
    articleTitle.innerText = post.title;
    articleTitle.className = "text-xl font-bold text-textPrimary"; // Added Tailwind classes
    articleBody.append(articleTitle);

    const articleText = document.createElement("p");
    articleText.innerText = post.body;
    articleText.className = "text-textSecondary text-sm"; // Added Tailwind classes
    articleBody.append(articleText);

    const articleTags = document.createElement("p");
    articleTags.className =
      "tags flex flex-wrap gap-2 mt-2 text-xs text-warmGray"; // Added Tailwind classes
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.innerText = `#${tag}`;
      tagSpan.className = "bg-gray-700 px-2 py-1 rounded-full text-softWhite"; // Added Tailwind classes
      articleTags.append(tagSpan);
    });
    articleBody.append(articleTags);

    const dateDiv = document.createElement("div");
    dateDiv.className = "post-date text-xs text-warmGray mt-4"; // Added Tailwind classes
    const date = new Date(post.created);
    dateDiv.innerText = `Posted on: ${date.toLocaleDateString()}`;
    articleBody.append(dateDiv);

    if (post.media && post.media.url) {
      const mediaDiv = document.createElement("div");
      mediaDiv.className = "media-container mt-4 rounded-lg overflow-hidden"; // Added Tailwind classes
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.className = "w-full h-auto object-cover"; // Added Tailwind classes
      mediaDiv.append(img);
      articleBody.append(mediaDiv);
    }

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "button-container flex gap-2 mt-4"; // Added Tailwind classes

    const articlebtn = document.createElement("button");
    articlebtn.innerText = "Read Post";
    articlebtn.className =
      "bg-primaryTeal text-softWhite px-4 py-2 rounded hover:bg-tealDark"; // Added Tailwind classes
    articlebtn.addEventListener("click", () => {
      window.location.href = `/post/single-post/?id=${post.id}`;
    });
    buttonDiv.append(articlebtn);

    if (isAuthorized) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className =
        "bg-tealLight text-softWhite px-4 py-2 rounded hover:bg-tealDark"; // Added Tailwind classes
      editBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location.href = `/post/edit/?id=${post.id}`;
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.className =
        "bg-complementaryCoral text-softWhite px-4 py-2 rounded hover:bg-coralDark"; // Added Tailwind classes
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
