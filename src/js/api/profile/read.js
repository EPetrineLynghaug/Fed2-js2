import { API_SOCIAL_PROFILES } from "../../api/constants";
import { headers } from "../../api/headers";

/**
 * @async
 * @function readProfile
 * @param {string} username - The username of the profile to be fetched.
 * @returns {Promise<object>} A promise that resolves to the user profile object.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function readProfile(username) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}?_posts=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    const profileData = result.data;

    if (profileData.posts && profileData.posts.length > 0) {
      profileData.posts.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
    }

    return profileData; // Return sorted data
  } catch (error) {
    console.error("Error reading profile:", error);
  }
}

/**
 * @async
 * @function readProfiles
 * @param {number} limit - The maximum number of profiles to fetch.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of user profile objects.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function readProfiles(limit, page) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}?limit=${limit}&page=${page}&_posts=true`,
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
    console.error("Error reading profiles:", error);
  }
}
