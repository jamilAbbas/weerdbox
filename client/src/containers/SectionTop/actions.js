// Section Top actions

import * as types from "./constants";

export function submitArtRequest(data) {
  console.log("--------------------submit ARt Request -------------------");
  console.log(data);
  console.log("---------------------End");
  return {
    type: types.SUBMIT_ART_REQUEST,
    data
  };
}
