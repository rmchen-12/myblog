import { fork } from "redux-saga/effects";
import { loginFlow, registerFlow, user_auth } from "./home";
import { get_all_users_flow } from "./admin/manageUser";
import { getAllTagsFlow, addTagFlow, delTagFlow } from "./admin/manageTags";
import { saveArticleFlow } from "./admin/manageNewArticle";

export default function* rootSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(user_auth);
  yield fork(get_all_users_flow);
  yield fork(getAllTagsFlow);
  yield fork(addTagFlow);
  yield fork(delTagFlow);
  yield fork(saveArticleFlow);
}
