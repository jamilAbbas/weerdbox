import { combineReducers } from "redux";
import artReducer from "./containers/SectionTop/reducers";
import loginReducer from "./containers/Login/reducer";
import registerReducer from "./containers/Register/reducer";
import mainSectionReducer from "./containers/app/reducers";
import dashboardReducer from "./containers/Dashboard/reducers";
import likeAndShareReducer from "./components/LikeandShare/reducer";
const app = combineReducers({
  arts: artReducer,
  auth: loginReducer,
  register: registerReducer,
  allArts: mainSectionReducer,
  myarts: dashboardReducer,
  likeAndShare:likeAndShareReducer
});

export default app;
