import { put, takeLatest, all, take, takeEvery } from "redux-saga/effects";
import { push, replace } from "react-router-redux";
import { axios } from "axios";
import { SUBMIT_ART_REQUEST } from "./containers/SectionTop/constants";
import { SIGNUP_REQUEST } from "./containers/Register/constants";
import { LOGIN_REQUEST } from "./containers/Login/constants";
import { GET_ALL_ARTS } from "./containers/app/constants";
import { GET_MY_ARTS } from "./containers/Dashboard/constants";
import { getAuthToken } from "./utils/getAuthToken";
import { setCurrentUser, loginFailed } from "./containers/Login/actions";
import { signUpSuccess } from "./containers/Register/actions";
import { getArtsSuccess } from "./containers/app/actions";
import { getMyArtsSuccess, getMyArts } from "./containers/Dashboard/actions";
import jwt_decode from "jwt-decode";
import { IMAGE_LIKE_REQUEST } from "./components/LikeandShare/constants";
import { imageLikeSuccess } from "./components/LikeandShare/actions";
import { getAllArts, searchArtsSuccess } from "./containers/app/actions";
import { SEARCH_ARTS_REQUEST } from "./containers/app/constants";
import { RESET_PASSWORD_REQUEST } from "./containers/ForgotPassword/action";
import { RESET_PASSWORD } from "./containers/ResetPasswordForm/constants";
import { EDIT_ART_REQUEST } from "./containers/app/constants";
import {
  ON_APPROVE_ART,
  ON_DISAPPROVE_ART,
  ON_DELETE_ART
} from "./containers/Admin/constants";
import { message } from "antd";
function* fetchArts(action) {
  const token = getAuthToken();
  const data = {
    name: action.data.name,
    email: action.data.email,
    website: action.data.website,
    phone: action.data.phone,
    description: action.data.description,
    tags: action.data.tags,
    art: action.data.art
  };
  try {
    const response = yield fetch("arts", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
  } catch (error) {}
}

function* signupRequestHandler(action) {
  const data = {
    fullname: action.data.name,
    email: action.data.email,
    password: action.data.password
  };
  try {
    const response = yield fetch("users/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => res.json());
    yield put(signUpSuccess());
  } catch (error) {
    // yield put(fetchListError(error));
  }
}

function* loginRequestWatcher(action) {
  const data = {
    email: action.data.username,
    password: action.data.password
  };
  try {
    const response = yield fetch("users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => res.json());
    if (response.token) {
      localStorage.setItem("jwtToken", response.token);
      const decoded = jwt_decode(response.token);
      yield put(setCurrentUser(decoded));
    }
  } catch (error) {
    console.log("catch login error");
  }
}

function* getAllArtsWorker(action) {
  try {
    const response = yield fetch("arts/all", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrer: "no-referrer"
    }).then(res => res.json());

    yield put(getArtsSuccess(response));
  } catch (error) {
    // yield put(fetchListError(error));
  }
}

function* getMyArtsWatcher(action) {
  const { id, email } = action.payload;
  const token = getAuthToken();

  const data = {
    email: email
  };
  try {
    const response = yield fetch("arts/myarts", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    yield put(getMyArtsSuccess(response));
  } catch (error) {
    console.log("catch dashboard error");
  }
}

function* imageLikeRequestWatcher(action) {
  console.log("imagelikerequestwatcher", action.payload.imageId);
  const data = {
    imageId: action.payload.imageId,
    userId: action.payload.userId
  };
  try {
    const response = yield fetch("likes/like", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    // yield put(imageLikeSuccess(response));
    console.log("oooooooooooooo", response);
    if (response.imageLiked === "You have already Liked this image") {
      console.log(response.imageLiked);
      message.warn(response.imageLiked);
    } else {
      yield put(getAllArts());
      message.success("Liked!");
    }
  } catch (error) {
    console.log("catch dashboard error");
  }
}

function* searchArtsWatcher(action) {
  const data = {
    searchQuery: action.payload
  };
  try {
    const response = yield fetch("arts/search", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    if (response.length < 1) {
      console.log(response.noSearchResult);
      message.warn(" No Results Found");
    } else {
      yield put(searchArtsSuccess(response));
    }
  } catch (error) {
    console.log("search error");
  }
}

function* approveRequestWatcher(action) {
  const data = {
    imageId: action.payload
  };
  try {
    const response = yield fetch("arts/approve", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    if (response.length < 1) {
      console.log(response.updateFailed);
      message.warn(" Could not update, try again");
    } else {
      yield put(getAllArts());
      message.success("Successfully approved");
    }
  } catch (error) {
    console.log("search error");
  }
}

function* disApproveRequestWatcher(action) {
  const data = {
    imageId: action.payload
  };
  try {
    const response = yield fetch("arts/disapprove", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    if (response.length < 1) {
      message.warn(" Could not disapprove, try again");
    } else {
      yield put(getAllArts());
      message.success("Successfully disapproved");
    }
  } catch (error) {
    console.log("search error");
  }
}

function* deleteArtWatcher(action) {
  const data = {
    imageId: action.payload
  };
  try {
    const response = yield fetch("arts/delete", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    if (response.length < 1) {
      message.warn(" Could not delete, try again");
    } else {
      yield put(getAllArts());
      message.success("Successfully deleted");
    }
  } catch (error) {
    console.log("delete error");
  }
}

function* resetPasswordRequestWatcher(action) {
  console.log(action.payload);
  const data = {
    email: action.payload
  };
  try {
    const response = yield fetch("/password/resetpasswordrequest", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    if (response.length < 1) {
      message.warn(" Could not send email, try again");
    } else {
      message.success(
        "Password reset link sent your email, please check your emial"
      );
    }
  } catch (error) {
    console.log("Email error");
  }
}

function* resetPasswordWatcher(action) {
  console.log("---payload---", action);
  const data = {
    existingEmail: action.payload.email,
    newPassword: action.payload.newPassword,
    token: action.payload.token
  };
  try {
    const response = yield fetch("/password/updatepassword", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(res => res.json());
    if (response.length < 1) {
      message.warn(" Could not change password, try again");
    } else {
      message.success("Password successfully changed, please login");
    }
  } catch (error) {
    console.log("Email error");
  }
}

function* editArtRequestWatcher(action) {
  console.log("edit art request saga", action.payload);
  try {
    const response = yield fetch("/arts/update", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        // Authorization: token,
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(action.payload)
    }).then(res => res.json());
    if (response.length < 1) {
      message.warn(" Update failed, try again");
    } else {
      yield put(getAllArts());
      message.success("Successfully updated");
      yield put(getMyArts(12, action.payload.email));
    }
  } catch (error) {
    console.log("Email error");
  }
}

function* submitArtWatcher(values) {
  yield takeLatest(SUBMIT_ART_REQUEST, fetchArts);
  yield takeLatest(SIGNUP_REQUEST, signupRequestHandler);
  yield takeLatest(LOGIN_REQUEST, loginRequestWatcher);
  yield takeLatest(GET_ALL_ARTS, getAllArtsWorker);
  yield takeLatest(GET_MY_ARTS, getMyArtsWatcher);
  yield takeLatest(IMAGE_LIKE_REQUEST, imageLikeRequestWatcher);
  yield takeLatest(SEARCH_ARTS_REQUEST, searchArtsWatcher);
  yield takeLatest(ON_APPROVE_ART, approveRequestWatcher);
  yield takeLatest(ON_DISAPPROVE_ART, disApproveRequestWatcher);
  yield takeLatest(ON_DELETE_ART, deleteArtWatcher);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordRequestWatcher);
  yield takeLatest(RESET_PASSWORD, resetPasswordWatcher);
  yield takeLatest(EDIT_ART_REQUEST, editArtRequestWatcher);
}

export default function* rootSaga() {
  yield all([submitArtWatcher()]);
}
