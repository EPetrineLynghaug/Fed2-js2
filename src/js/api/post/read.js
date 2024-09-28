import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * @async
 * @function readPost
 * @param {string|number} id - The ID of the post to be fetched.
 * @returns {Promise<object>} A promise that resolves to the post object or the complete result if the post data is not available.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function readPost(id) {
  try {
    const response = await fetch(
      `${API_SOCIAL_POSTS}/${id}?_author=true&_reactions=true&_comments=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data || result;
  } catch (error) {
    throw new Error(
      `Failed to fetch post with ID: ${id}. Error: ${error.message}`
    );
  }
}
/**
 * @async
 * @function readPosts
 * @param {number} [limit=12] - The number of posts to fetch.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag] - Optional tag to filter the posts.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of post objects.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function readPosts(limit = 12, page = 1, tag) {
  try {
    const response = await fetch(
      `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}&_author=true&_reactions=true&_comments=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error reading posts:", error);
  }
}

/**
 * @async
 * @function readPostsByUser
 * @param {string} username - The username of the user whose posts are to be fetched.
 * @param {number} [limit=12] - The number of posts to fetch.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag] - Optional tag to filter the posts.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of post objects for the specified user.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    const response = await fetch(
      `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}&_author=true&_reactions=true&_comments=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error reading posts:", error);
  }
}
