import * as types from "./constants";
import isEmpty from "../../isempty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
  }
  return state;
}

export default loginReducer;
