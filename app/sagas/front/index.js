import { take, put, call } from "redux-saga/effects";
import { get } from "../../fetch";
import { actionsTypes as IndexActionTypes } from "../../reducers";
import { actionTypes as FrontActionTypes } from "../../reducers/front";

export function* getArticleList(tag, pageNum) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(
      get,
      `/getArticles?pageNum=${pageNum}&isPublish=true&tag=${tag}`
    );
  } catch (err) {
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: "网络请求错误",
      msgType: 0
    });
  } finally {
    yield put({ type: IndexActionTypes.FETCH_END });
  }
}

export function* getArticleListFlow() {
  while (true) {
    let { tag, pageNum } = yield take(FrontActionTypes.GET_ARTICLE_LIST);
    console.log(req);
    let res = yield call(getArticleList, tag, pageNum);
    if (res) {
      if (res.code === 0) {
        res.data.pageNum = pageNum;
        yield put({
          type: FrontActionTypes.RESPONSE_ARTICLE_LIST,
          data: res.data
        });
      } else {
        yield put({
          type: IndexActionTypes.SET_MESSAGE,
          msgContent: res.message,
          msgType: 0
        });
      }
    }
  }
}

export function* getArticleDetail(id) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(get, `/getArticleDetail?id=${id}`);
  } catch (error) {
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: "网络请求错误",
      msgType: 0
    });
  } finally {
    yield put({
      type: IndexActionTypes.FETCH_END
    });
  }
}

export function* getArticleDetailFlow() {
  while (true) {
    let { id } = yield take(FrontActionTypes.GET_ARTICLE_DETAIL);
    let res = yield call(getArticleDetail, id);
    if (res) {
      if (res.code === 0) {
        yield put({
          type: FrontActionTypes.RESPONSE_ARTICLE_DETAIL,
          data: res.data
        });
      } else {
        yield put({
          type: IndexActionTypes.SET_MESSAGE,
          msgContent: res.message,
          msgType: 0
        });
      }
    }
  }
}
