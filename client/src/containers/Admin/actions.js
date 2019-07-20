// Admin Actions
import * as types from "./constants";

export function getAllReduestedArtsRequest() {
  return {
    type: types.GET_ALL_EMAILS_REQUEST
  };
}

export function approveArt(id) {
  return {
    type: types.ON_APPROVE_ART,
    payload: id
  };
}
export function disApproveArt(id) {
  return {
    type: types.ON_DISAPPROVE_ART,
    payload: id
  };
}

export function deleteArt(id) {
  return {
    type: types.ON_DELETE_ART,
    payload: id
  };
}
