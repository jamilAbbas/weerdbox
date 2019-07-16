import * as types from "./constants";

const initialState = {
  isRegisterd: false
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isRegisterd: true
      };
  }
  return state;
}

export default registerReducer;
