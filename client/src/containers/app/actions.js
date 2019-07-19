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

export function searchArtsRequest(data) {
  console.log("searchReq", data);
  return {
    type: types.SEARCH_ARTS_REQUEST,
    payload: data
  };
}

export function searchArtsSuccess(data) {
  return {
    type: types.GET_ALL_ARTS_SUCCESS,
    payload: data
  };
}
