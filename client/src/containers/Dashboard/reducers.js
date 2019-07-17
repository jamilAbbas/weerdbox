import * as types from "./constants";

const initialState = {
  myarts: []
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MY_ARTS_SUCCESS:
      return {
        ...state,
        myarts: action.payload
      };
  }
  return state;
}

export default dashboardReducer;
