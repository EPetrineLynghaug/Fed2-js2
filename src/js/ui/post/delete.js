import { deletePost } from "../../api/post/delete";
import { showCustomAlert } from "../../utilities/customAlert";

/**
 * @async
 * @function onDeletePost
 * @description Prompts the user for confirmation to delete a post. If confirmed,
 * it calls the `deletePost` function to delete the post with the specified ID.
 * If the deletion is successful, the post element is removed from the DOM.
 * @param {HTMLElement} postElement - The HTML element representing the post to be deleted.
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<void>} This function does not return a value.
 */
export async function onDeletePost(postElement, postId) {
  // Use showCustomAlert as a confirmation dialog
  const confirmed = await showCustomAlert(
    "Are you sure you want to delete this post?",
    "info",
    true // confirmation mode
  );

  if (!confirmed) return;

  try {
    const response = await deletePost(postId);
    if (response) {
      if (postElement) postElement.remove();
      showCustomAlert("Post deleted successfully", "success");
    } else {
      throw new Error("No response received from the API");
    }
  } catch (error) {
    console.error("Failed to delete post:", error.message);
    showCustomAlert(
      `There was an error deleting the post: ${error.message}. Please try again later.`,
      "error"
    );
  }
}
