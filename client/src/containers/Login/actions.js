import * as types from "./constants";

export function loginRequest(data) {
  return {
    type: types.LOGIN_REQUEST,
    data
  };
}

export function loginFailed(data) {
  return {
    type: types.LOGIN_REQUEST,
    payload: data
  };
}

export function setCurrentUser(decoded) {
  return {
    type: types.SET_CURRENT_USER,
    payload: decoded
  };
}
