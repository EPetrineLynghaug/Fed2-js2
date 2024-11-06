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
    // Fetch post data from the API
    const post = await readPost(id);
    if (!post) throw new Error("Post not found");

    // Create main container for the post
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

    // Display author information
    const author = document.createElement("p");
    author.innerText = `By ${post.author.name}`;
    author.classList.add("text-sm", "font-semibold", "mb-2");
    author.style.color = "#BB86FC";
    postContainer.appendChild(author);

    // Display post title
    const title = document.createElement("h1");
    title.innerText = post.title || "Untitled";
    title.classList.add("text-2xl", "md:text-3xl", "font-bold", "mb-4");
    title.style.color = "#E0E0E0";
    postContainer.appendChild(title);

    // Display post body
    const body = document.createElement("p");
    body.innerText = post.body || "No content available";
    body.classList.add("text-base", "leading-6", "md:leading-7", "mb-5");
    body.style.color = "#A0A0A0";
    postContainer.appendChild(body);

    // Display post media if available
    if (post.media && post.media.url) {
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.classList.add("w-full", "object-cover", "mt-4", "rounded-md");
      img.style.maxHeight = "300px";
      postContainer.appendChild(img);
    }

    // Display tags
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

    // Display post creation date
    const dateDiv = document.createElement("p");
    dateDiv.classList.add("text-xs", "mt-3");
    const date = new Date(post.created);
    dateDiv.innerText = `Posted on: ${date.toLocaleDateString()}`;
    dateDiv.style.color = "#A0A0A0";
    postContainer.appendChild(dateDiv);

    // Define base button styling classes
    const baseButtonClasses =
      "text-white font-medium px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded focus:outline-none focus:ring-1 focus:ring-offset-1 transition-colors duration-150 ease-in-out";

    // Create Edit and Delete buttons for post authors
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "justify-end", "gap-2", "mt-4");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = `${baseButtonClasses} bg-purple-400 hover:bg-purple-500`;
    editButton.onclick = () => {
      window.location.href = `/post/edit/?id=${post.id}`;
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = `${baseButtonClasses} bg-red-500 hover:bg-red-600`;
    deleteButton.onclick = async () => {
      console.log(`Post ${post.id} deleted`);
    };

    // Append Edit/Delete buttons if user owns the post
    if (post.isUserPost) {
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);
      postContainer.appendChild(buttonContainer);
    }

    // Add a Back button for navigation
    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.className = `${baseButtonClasses} bg-teal-500 hover:bg-teal-600 mt-5`;
    backButton.onclick = () => {
      window.location.href = "/";
    };
    postContainer.appendChild(backButton);

    document.body.appendChild(postContainer);
  } catch (error) {
    console.error("Error fetching post:", error.message);

    // Display error message if post loading fails
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

    const errorMessage = document.createElement("p");
    errorMessage.innerText = `Failed to load the post: ${error.message}`;
    errorMessage.classList.add("text-lg", "font-semibold", "mb-4");
    errorContainer.appendChild(errorMessage);

    // Back button for error screen
    const errorBackButton = document.createElement("button");
    errorBackButton.innerText = "Back";
    errorBackButton.className = `${baseButtonClasses} bg-teal-500 hover:bg-teal-600 mt-4`;
    errorBackButton.onclick = () => {
      window.location.href = "/";
    };
    errorContainer.appendChild(errorBackButton);

    document.body.appendChild(errorContainer);
  }
}
