import { createPost } from "../../api/post/create";
import { showCustomAlert } from "../../utilities/customAlert";

/**
 * @async
 * @function onCreatePost
 * @description Handles the form submission for creating a new post.
 * Validates the input fields and ensures that the media URL, if provided, is a valid image URL.
 * If the post is created successfully, the user is redirected to the newly created post's page.
 * @param {Event} event - The event object representing the form submission event.
 * @returns {Promise<void>} This function does not return a value.
 */

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  // Extract and trim user input from the form fields
  const title = form ? form[0].value.trim() : "";
  const body = form ? form[1].value.trim() : "";
  const tags = form ? form[2].value.trim() : "";
  const mediaUrl = form ? form[3].value.trim() : "";
  const mediaAlt = form ? form[4].value.trim() : "";

  // Check if the required fields (title and body) are filled
  if (!title || !body) {
    showCustomAlert("Title and body are required to create a post.", "error");
    return;
  }

  // Convert tags from a space-separated string to an array
  const tagArr = tags ? tags.split(" ") : [];

  // Define valid image extensions for URL validation
  const imgExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

  // Function to validate the image URL format
  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      const urlObject = new URL(url); // Check if URL is valid
      const extension = urlObject.pathname.split(".").pop().toLowerCase();
      return imgExtensions.includes(extension); // Confirm extension is valid
    } catch (error) {
      console.error("Invalid image URL");
      return false;
    }
  };

  // If media URL is provided, validate its format
  if (mediaUrl && !isValidImageUrl(mediaUrl)) {
    showCustomAlert("Please enter a valid image URL.", "error");
    return;
  }

  // Disable submit button and show loading indicator
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating...';

  // Prepare the request body with post data
  const reqBody = {
    title,
    body,
    tags: tagArr.length > 0 ? tagArr : undefined, // Only add tags if provided
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || undefined } : undefined, // Add media only if URL is provided
  };

  try {
    // Send the post creation request to the server
    const post = await createPost(reqBody);

    // If the post was created successfully, redirect to the single post view
    if (post && post.id) {
      showCustomAlert("Post created successfully!", "success");
      window.location.href = `/post/single-post/?id=${post.id}`;
    } else {
      throw new Error("Post ID not returned");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    // Show error alert if post creation fails
    showCustomAlert(
      "There was an error creating the post. Please try again.",
      "error"
    );
  } finally {
    // Re-enable the submit button and restore original text
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit Post";
  }
}
