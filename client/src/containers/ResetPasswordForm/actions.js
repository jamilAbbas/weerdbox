import * as types from "./constants";

export function resetPassword(values, token) {
  const email = values.username;
  const newPassword = values.password;
  return {
    type: types.RESET_PASSWORD,
    payload: { email,newPassword, token }
  };
}
