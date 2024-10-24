import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";

/**
 * @async
 * @function createPost
 * @param {object} reqBody - The request body object containing post details
 * @param {string} reqBody.name - The name of the user
 * @param {string} reqBody.email - The email address of the user
 * @param {string} reqBody.password - The password for the user
 * @returns {Promise<object>} result - The result of the registration request
 */
export async function createPost(reqBody) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error or invalid JSON:", error.message);
    } else if (error.message.includes("Response Status")) {
      console.error("Failed to create post:", error.message);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    throw error;
  }
}
