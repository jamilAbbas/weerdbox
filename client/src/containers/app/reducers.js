import * as types from "./constants";
// import isEmpty from "../../isempty";

const initialState = {
  allArts: []
};

function mainSectionReducer(state = [], action) {
  switch (action.type) {
    case types.GET_ALL_ARTS_SUCCESS:
      return  action.payload;
  }
  return state;
}

export default mainSectionReducer;
