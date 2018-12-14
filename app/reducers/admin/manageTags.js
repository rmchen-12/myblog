const initialState = ["首页"];

export const actionTypes = {
  GET_ALL_TAGS: "GET_ALL_TAGS",
  SET_TAGS: "RESPONSE_GET_ALL_TAGS",
  DELETE_TAG: "DELETE_TAG",
  ADD_TAG: "ADD_TAG"
};

export const actions = {
  get_all_tags: () => ({ type: actionTypes.GET_ALL_TAGS }),
  delete_tag: name => ({
    type: actionTypes.DELETE_TAG,
    name
  }),
  add_tag: name => ({ type: actionTypes.ADD_TAG, name })
};

export function tags(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TAGS:
      return ["首页", ...action.data];
    default:
      return state;
  }
}
