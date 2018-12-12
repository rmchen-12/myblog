import { fork } from "redux-saga/effects";
import { loginFlow, registerFlow, user_auth } from "./home";
import { get_all_users_flow } from "./admin/manageUser";

export default function* rootSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(user_auth);
  yield fork(get_all_users_flow);
}
