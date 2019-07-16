import { combineReducers } from "redux";
import artReducer from "./containers/SectionTop/reducers";
import loginReducer from "./containers/Login/reducer";
import registerReducer from "./containers/Register/reducer";
import mainSectionReducer from "./containers/app/reducers";

const app = combineReducers({
  arts: artReducer,
  auth: loginReducer,
  register: registerReducer,
  allArts: mainSectionReducer
});

export default app;
