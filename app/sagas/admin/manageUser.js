import { put, take, call } from "redux-saga/effects";
import { get } from "../../fetch/";
import { actionsTypes as IndexActionTypes } from "../../reducers";
import { actionTypes as ManageUserActionTypes } from "../../reducers/admin/manageUser";

export function* fetch_users(pageNum) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(get, `/admin/getUsers?pageNum=${pageNum}`);
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

export function* get_all_users_flow() {
  while (true) {
    let request = yield take(ManageUserActionTypes.GET_ALL_USER);
    let pageNum = request.pageNum || 1;
    let res = yield call(fetch_users, pageNum);
    if (res && res.code === 0) {
      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].key = i;
      }
      let data = {};
      data.total = res.data.total;
      data.list = res.data.list;
      data.pageNum = Number.parseInt(pageNum);
      yield put({ type: ManageUserActionTypes.RESOLVE_GET_ALL_USERS, data });
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
