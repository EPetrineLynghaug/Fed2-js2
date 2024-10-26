import { deletePost } from "../../api/post/delete";

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
  const confirmation = confirm("Are you sure you want to delete this post?");
  if (!confirmation) return;

  try {
    const response = await deletePost(postId);

    if (response) {
      if (postElement) postElement.remove();

      alert("Post deleted successfully");
    } else {
      throw new Error("No response received from the API");
    }
  } catch (error) {
    console.error("Failed to delete post:", error.message);
    alert(
      `There was an error deleting the post: ${error.message}. Please try again later.`
    );
  }
}
