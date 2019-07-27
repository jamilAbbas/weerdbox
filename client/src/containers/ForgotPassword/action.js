export const RESET_PASSWORD_REQUEST =
  "app/ForgetPassword/RESET_PASSWORD_REQUEST";

export function resetPasswordRequest(email) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: email
  };
}
