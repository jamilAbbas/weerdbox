import * as types from "./constants";

export function imageLikeRequest(imageId, userId) {
  return {
    type: types.IMAGE_LIKE_REQUEST,
    payload: { imageId, userId }
  };
}

export function imageLikeSuccess(data) {
  console.log('succesLikeAction', data)
  return {
    type: types.IMAGE_LIKE_SUCCESS,
    payload: data
  };
}
