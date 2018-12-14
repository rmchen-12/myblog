const initialState = {
  articleList: [],
  pageNum: 1,
  total: 0
};

export const actionTypes = {
  ADMIN_GET_ARTICLE_LIST: "ADMIN_GET_ARTICLE_LIST",
  ADMIN_RESPONSE_GET_ARTICLE_LIST: "ADMIN_RESPONSE_GET_ARTICLE_LIST",
  ADMIN_EDIT_ARTICLE: "ADMIN_EDIT_ARTICLE",
  ADMIN_DELETE_ARTICLE: "ADMIN_DELETE_ARTICLE"
};

export const actions = {
    get_article_list(pageNum=1){
        return {
            type: actionTypes.
        }
    }
}