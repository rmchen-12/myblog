import admin from "./admin";
import { reducer as front } from "./front";
import { combineReducers } from "redux";

const initialState = {
  ifFetching: true,
  msg: {
    type: 1,
    content: ""
  },
  userInfo: {}
};

export const actionsTypes = {
  FETCH_START: "FETCH_START",
  FETCH_END: "FETCH_END",
  USER_LOGIN: "USER_LOGIN",
  USER_REGISTER: "USER_REGISTER",
  RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
  SET_MESSAGE: "SET_MESSAGE",
  USER_AUTH: "USER_AUTH"
};

export const actions = {
  get_login(username, password) {
    return {
      type: actionsTypes.USER_LOGIN,
      username,
      password
    };
  },
  get_register(data) {
    return {
      type: actionsTypes.USER_REGISTER,
      data
    };
  },
  clear_msg() {
    return { type: actionsTypes.SET_MESSAGE, msgType: 1, msgContent: "" };
  },
  user_auth() {
    return {
      type: actionsTypes.USER_AUTH
    };
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case actionsTypes.FETCH_END:
      return {
        ...state,
        isFetching: false
      };
    case actionsTypes.SET_MESSAGE:
      return {
        ...state,
        isFetching: false,
        msg: {
          type: action.msgType,
          content: action.msgContent
        }
      };
    case actionsTypes.RESPONSE_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      };
    default:
      return state;
  }
}

export default combineReducers({
  front,
  globalState: reducer,
  admin
});
