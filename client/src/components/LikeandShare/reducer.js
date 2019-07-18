import * as types from "./constants";
const initialState = {
  likes: null
};

function likeAndShareReducer(state = initialState, action) {
  switch (action.type) {
    case types.IMAGE_LIKE_SUCCESS:
    console.log('IMAGE_LIKE_SUCCESS reducer', action.payload)
    
      return {
        ...state,
        likes: action.payload.likedData
      };
  }
  return state;
}
export default likeAndShareReducer;
