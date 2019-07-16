import * as types from "./constants";

export function signUpRequest(data) {
  return {
    type: types.SIGNUP_REQUEST,
    data
  };
}

export function signUpSuccess() {
  return {
    type: types.SIGNUP_SUCCESS
  };
}
