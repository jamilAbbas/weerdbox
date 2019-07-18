import * as types from "./constants";

export function imageLikeRequest(imageId, userId) {
  console.log("image", imageId);
  console.log("userId", userId);

  return {
    type: types.IMAGE_LIKE_REQUEST,
    payload:{imageId, userId}
  };
}
