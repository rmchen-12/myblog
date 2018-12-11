import { put, take, call } from "redux-saga/effects";
import { get } from "../../fetch";
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
  }
}
