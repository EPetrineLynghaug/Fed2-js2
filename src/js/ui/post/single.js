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
    postContainer.classList.add("post");

    const author = document.createElement("p");
    author.innerText = post.author.name;
    postContainer.appendChild(author);

    const title = document.createElement("h1");
    title.innerText = post.title || "No title available";
    postContainer.appendChild(title);

    const body = document.createElement("p");
    body.innerText = post.body || "No content available";
    postContainer.appendChild(body);

    if (post.media && post.media.url) {
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.height = 300;
      img.width = 300;
      postContainer.appendChild(img);
    }
    const tags = document.createElement("p");
    tags.innerText = post.tags ? post.tags.join(", ") : "No tags";
    postContainer.appendChild(tags);
    const backButton = document.createElement("button");
    backButton.innerText = "Back";
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
