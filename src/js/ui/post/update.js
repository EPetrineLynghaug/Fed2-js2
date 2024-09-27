import { updatePost } from "../../api/post/update";

/**
 * @function onUpdatePost
 * @description Handles the post update event, preventing the default form submission.
 * It collects the updated post data from the form, constructs a request body,
 * and sends it to update the post with the given ID.
 * If the update is successful, the user is redirected to the updated post's page.
 *
 * @param {Event} event - The event triggered by the form submission.
 * @param {string} id - The ID of the post to be updated.
 * @returns {Promise<void>} This function does not return a value.
 */
export async function onUpdatePost(event, id) {
  event.preventDefault();

  const form = event.target;
  const title = form ? form[0].value : "";
  const body = form ? form[1].value : "";
  const tags = form ? form[2].value : "";
  const mediaUrl = form ? form[3].value : "";
  const mediaAlt = form ? form[4].value : "";

  const tagArr = tags.split(" ");

  const reqBody = {
    title,
    body: body || undefined,
    tags: tagArr.length > 0 ? tagArr : undefined,
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || undefined } : undefined,
  };

  const post = await updatePost(id, reqBody);
  if (post) {
    window.location.href = `/post/single-post/?id=${id}`;
  }
}
