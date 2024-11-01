import { readPost } from "../../api/post/read";

/**
 * @async
 * @function onSinglePost
 * @description Fetches a single post by its ID and renders it in the DOM.
 * If the post is not found, it throws an error. It also includes a back button
 * to navigate to the home page.
 * @param {string} id - The ID of the post to fetch and display.
 * @returns {Promise<void>} This function does not return a value.
 */
export async function onSinglePost(id) {
  try {
    const post = await readPost(id);

    if (!post) {
      throw new Error("Post not found");
    }

    const postContainer = document.createElement("div");
    postContainer.classList.add(
      "bg-backgroundCard",
      "rounded-lg",
      "shadow-lg",
      "p-4",
      "m-4",
      "max-w-2xl",
      "mx-auto"
    ); // Card styles

    const author = document.createElement("p");
    author.innerText = post.author.name;
    author.classList.add("text-textPrimary", "font-medium", "mb-2"); // Author styles
    postContainer.appendChild(author);

    const title = document.createElement("h1");
    title.innerText = post.title || "No title available";
    title.classList.add("text-2xl", "font-bold", "text-textPrimary", "mb-2"); // Title styles
    postContainer.appendChild(title);

    const body = document.createElement("p");
    body.innerText = post.body || "No content available";
    body.classList.add("text-textSecondary", "mb-2"); // Body styles
    postContainer.appendChild(body);

    if (post.media && post.media.url) {
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.classList.add("w-full", "h-auto", "mt-4", "rounded-lg"); // Image styles
      postContainer.appendChild(img);
    }

    const tags = document.createElement("p");
    tags.innerText = post.tags ? post.tags.join(", ") : "No tags";
    tags.classList.add("text-xs", "text-warmGray", "mt-2"); // Tags styles
    postContainer.appendChild(tags);

    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.classList.add(
      "bg-primaryTeal",
      "text-softWhite",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-tealDark",
      "mt-4"
    ); // Back button styles
    backButton.onclick = () => {
      window.location.href = "/";
    };
    postContainer.appendChild(backButton);

    document.body.appendChild(postContainer);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    alert(`Failed to load the post. Error: ${error.message}`);
  }
}
