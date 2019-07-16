import * as types from "./constants";

export function getAllArts() {
  return {
    type: types.GET_ALL_ARTS
  };
}

export function getArtsSuccess(data) {
  return {
    type: types.GET_ALL_ARTS_SUCCESS,
    payload: data
  };
}
