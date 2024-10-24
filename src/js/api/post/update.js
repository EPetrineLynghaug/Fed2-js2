import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";

/**
 * @async
 * @function updatePost
 * @param {string|number} id - The ID of the post to be updated.
 * @param {object} reqBody - The request body containing the updated post details.
 * @param {string} reqBody.title - The new title of the post.
 * @param {string} reqBody.content - The new content of the post.
 * @param {Array<string>} [reqBody.tags] - Optional array of tags for the post.
 * @returns {Promise<object>} A promise that resolves to the updated post object.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function updatePost(id, reqBody) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update post. Response Status: ${response.status}`
      );
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error or request failed:", error.message);
    } else if (error.message.includes("Response Status")) {
      console.error(`Failed to update post (ID: ${id}):`, error.message);
    } else {
      console.error(
        "An unexpected error occurred while updating the post:",
        error.message
      );
    }
    throw error;
  }
}
