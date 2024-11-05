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

    // Main post container with responsive width and padding
    const postContainer = document.createElement("div");
    postContainer.classList.add(
      "p-4",
      "sm:p-5",
      "md:p-6",
      "m-4",
      "max-w-full",
      "sm:max-w-xl",
      "md:max-w-2xl",
      "lg:max-w-3xl",
      "mx-auto"
    );
    postContainer.style.borderRadius = "14px";
    postContainer.style.transition = "transform 0.15s ease";

    // Author information
    const author = document.createElement("p");
    author.innerText = `By ${post.author.name}`;
    author.classList.add("text-sm", "font-semibold", "mb-2");
    author.style.color = "#BB86FC";
    postContainer.appendChild(author);

    // Post title
    const title = document.createElement("h1");
    title.innerText = post.title || "Untitled";
    title.classList.add("text-2xl", "md:text-3xl", "font-bold", "mb-4");
    title.style.color = "#E0E0E0";
    postContainer.appendChild(title);

    // Full post body text with balanced font size
    const body = document.createElement("p");
    body.innerText = post.body || "No content available";
    body.classList.add("text-base", "leading-6", "md:leading-7", "mb-5");
    body.style.color = "#A0A0A0";
    postContainer.appendChild(body);

    // Post media (image) with a set height limit
    if (post.media && post.media.url) {
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.classList.add("w-full", "object-cover", "mt-4", "rounded-md");
      img.style.maxHeight = "300px";
      img.style.width = "100%";
      postContainer.appendChild(img);
    }

    // Post tags
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("flex", "flex-wrap", "gap-2", "mt-3");
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.innerText = `#${tag}`;
      tagSpan.classList.add("px-2", "py-1", "rounded-full", "text-xs");
      tagSpan.style.backgroundColor = "#252525";
      tagSpan.style.color = "#E0E0E0";
      tagsContainer.appendChild(tagSpan);
    });
    postContainer.appendChild(tagsContainer);

    // Date posted
    const dateDiv = document.createElement("p");
    dateDiv.classList.add("text-xs", "mt-3");
    const date = new Date(post.created);
    dateDiv.innerText = `Posted on: ${date.toLocaleDateString()}`;
    dateDiv.style.color = "#A0A0A0";
    postContainer.appendChild(dateDiv);

    // Button container for Edit and Delete buttons on the right side
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "justify-end", "gap-2", "mt-4");

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add(
      "text-white",
      "font-medium",
      "px-3",
      "py-1",
      "rounded",
      "transition-colors",
      "duration-150",
      "ease-in-out"
    );
    editButton.style.backgroundColor = "#BB86FC";
    editButton.onclick = () => {
      window.location.href = `/post/edit/?id=${post.id}`;
    };

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add(
      "text-white",
      "font-medium",
      "px-3",
      "py-1",
      "rounded",
      "transition-colors",
      "duration-150",
      "ease-in-out"
    );
    deleteButton.style.backgroundColor = "#CF6679";
    deleteButton.onclick = async () => {
      // Add delete functionality here
      console.log(`Post ${post.id} deleted`);
    };

    // Only add Edit and Delete buttons if the user is the author
    if (post.isUserPost) {
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);
      postContainer.appendChild(buttonContainer);
    }

    // Back button with smaller styling
    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.classList.add(
      "text-white",
      "font-medium",
      "px-3",
      "py-1",
      "rounded",
      "mt-5",
      "transition-colors",
      "duration-150",
      "ease-in-out"
    );
    backButton.style.backgroundColor = "#03DAC6";
    backButton.style.fontSize = "0.85rem";
    backButton.style.maxWidth = "100px";
    backButton.onclick = () => {
      window.location.href = "/";
    };
    postContainer.appendChild(backButton);

    document.body.appendChild(postContainer);
  } catch (error) {
    console.error("Error fetching post:", error.message);

    // Create error card
    const errorContainer = document.createElement("div");
    errorContainer.classList.add(
      "p-4",
      "sm:p-5",
      "md:p-6",
      "m-4",
      "max-w-full",
      "sm:max-w-xl",
      "md:max-w-2xl",
      "lg:max-w-3xl",
      "mx-auto",
      "bg-red-600",
      "text-white",
      "rounded-lg",
      "text-center"
    );
    errorContainer.style.borderRadius = "14px";

    // Error message
    const errorMessage = document.createElement("p");
    errorMessage.innerText = `Failed to load the post: ${error.message}`;
    errorMessage.classList.add("text-lg", "font-semibold", "mb-4");
    errorContainer.appendChild(errorMessage);

    // Back button for error card
    const errorBackButton = document.createElement("button");
    errorBackButton.innerText = "Back";
    errorBackButton.classList.add(
      "text-white",
      "font-medium",
      "px-3",
      "py-1",
      "rounded",
      "mt-4",
      "transition-colors",
      "duration-150",
      "ease-in-out"
    );
    errorBackButton.style.backgroundColor = "#03DAC6";
    errorBackButton.style.fontSize = "0.85rem";
    errorBackButton.onclick = () => {
      window.location.href = "/";
    };
    errorContainer.appendChild(errorBackButton);

    document.body.appendChild(errorContainer);
  }
}
