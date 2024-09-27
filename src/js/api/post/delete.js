import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * @async
 * @function deletePost
 * @param {string|number} id - The ID of the post to be deleted.
 * @returns {Promise<boolean>} A promise that resolves to true if the post was deleted successfully, or false otherwise.
 * @throws {Error} Throws an error if the response is not ok or if there is a network error.
 */
export async function deletePost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
