import { GET_MY_ARTS, GET_MY_ARTS_SUCCESS } from "./constants";

export function getMyArts(id, email) {
  return {
    type: GET_MY_ARTS,
    payload: { id, email }
  };
}

export function getMyArtsSuccess(data) {
  return {
    type: GET_MY_ARTS_SUCCESS,
    payload: data
  };
}
