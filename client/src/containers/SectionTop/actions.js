// Section Top actions

import * as types from "./constants";

export function submitArtRequest(data) {
  return {
    type: types.SUBMIT_ART_REQUEST,
    data
  };
}
