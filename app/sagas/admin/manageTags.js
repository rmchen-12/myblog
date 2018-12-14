import { put, take, call } from "redux-saga/effects";
import { get, post } from "../../fetch";
import { actionsTypes as IndexActionTypes } from "../../reducers";
import { actionTypes as ManageTagsTypes } from "../../reducers/admin/manageTags";

export function* getAllTags() {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(get, "/getAllTags");
  } catch (error) {
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: "网络请求错误",
      msgType: 0
    });
  } finally {
    yield put({ type: IndexActionTypes.FETCH_END });
  }
}

export function* addTag(name) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(post, "/admin/tags/addTag", { name });
  } catch (error) {
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: "网络请求错误",
      msgType: 0
    });
  } finally {
    yield put({ type: IndexActionTypes.FETCH_END });
  }
}

export function* delTag(name) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(get, `/admin/tags/delTag?name=${name}`);
  } catch (error) {
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: "网络请求错误",
      msgType: 0
    });
  } finally {
    yield put({ type: IndexActionTypes.FETCH_END });
  }
}

export function* getAllTagsFlow() {
  while (true) {
    yield take(ManageTagsTypes.GET_ALL_TAGS);
    let res = yield call(getAllTags);
    if (res.code === 0) {
      let tempArr = [];
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        tempArr.push(element.name);
      }
      yield put({ type: ManageTagsTypes.SET_TAGS, data: tempArr });
    } else if (res.message === "身份信息已过期，请重新登录") {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 1
      });
      setTimeout(() => {
        location.replace("/");
      }, 1000);
    } else {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 1
      });
    }
  }
}

export function* delTagFlow() {
  while (true) {
    let req = yield take(ManageTagsTypes.DELETE_TAG);
    let res = yield call(delTag, req.name);
    if (res.code === 0) {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 1
      });
      yield put({ type: ManageTagsTypes.GET_ALL_TAGS });
    } else if (res.message === "身份信息已过期，请重新登录") {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
      setTimeout(() => {
        location.replace("/");
      }, 1000);
    } else {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
    }
  }
}

export function* addTagFlow() {
  while (true) {
    let req = yield take(ManageTagsTypes.ADD_TAG);
    let res = yield call(addTag, req.name);
    if (res.code === 0) {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 1
      });
      yield put({
        type: ManageTagsTypes.GET_ALL_TAGS
      });
    } else if (res.message === "身份信息已过期，请重新登录") {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
      setTimeout(function() {
        location.replace("/");
      }, 1000);
    } else {
      yield put({
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
    }
  }
}
