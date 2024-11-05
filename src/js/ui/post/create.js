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
  const title = form ? form[0].value.trim() : "";
  const body = form ? form[1].value.trim() : "";
  const tags = form ? form[2].value.trim() : "";
  const mediaUrl = form ? form[3].value.trim() : "";
  const mediaAlt = form ? form[4].value.trim() : "";

  // Validation for required fields
  if (!title || !body) {
    showCustomAlert("Title and body are required to create a post.", "error");
    return;
  }

  const tagArr = tags ? tags.split(" ") : [];

  const imgExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      const urlObject = new URL(url);
      const extension = urlObject.pathname.split(".").pop().toLowerCase();
      return imgExtensions.includes(extension);
    } catch (error) {
      console.error("Invalid image URL");
      return false;
    }
  };

  if (mediaUrl && !isValidImageUrl(mediaUrl)) {
    showCustomAlert("Please enter a valid image URL.", "error");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating...';

  const reqBody = {
    title,
    body,
    tags: tagArr.length > 0 ? tagArr : undefined,
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || undefined } : undefined,
  };

  try {
    const post = await createPost(reqBody);

    if (post && post.id) {
      showCustomAlert("Post created successfully!", "success");
      window.location.href = `/post/single-post/?id=${post.id}`;
    } else {
      throw new Error("Post ID not returned");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    showCustomAlert(
      "There was an error creating the post. Please try again.",
      "error"
    );
  } finally {
    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit Post";
  }
}
