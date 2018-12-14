import { combineReducers } from "redux";
import { users } from "./manageUser";
import { tags } from "./manageTags";
import { newArticle } from "./manageNewArticle";

export const actionTypes = {
  ADMIN_URI_LOCATION: "ADMIN_URI_LOCATION"
};

const initialState = {
  url: "/"
};

export const actions = {
  change_location_admin: function(url) {
    return {
      type: actionTypes.ADMIN_URI_LOCATION,
      data: url
    };
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADMIN_URI_LOCATION:
      return {
        ...state,
        url: action.data
      };
    default:
      return state;
  }
}

export default combineReducers({
  adminGlobalState: reducer,
  users,
  tags,
  newArticle
});
