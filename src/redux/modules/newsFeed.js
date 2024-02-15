//action value
const INITIALIZATION = "initialization";
const ALL_FEED = "feed/ALL_FEED";
const ADD_FEED = "feed/ADD_FEED ";
const DELETE_FEED = "feed/DELETE_FEED";
const EDIT_FEED = "feed/EDIT_FEED";

//action creator
export const initialization = (payload) => {
  return {
    type: INITIALIZATION,
    payload
  };
};

export const allFeed = (payload) => {
  return { type: ALL_FEED, payload };
};
export const addFeed = (payload) => {
  return { type: ADD_FEED, payload };
};

export const deleteFeed = (payload) => {
  return { type: DELETE_FEED, payload };
};

export const editFeed = (payload) => {
  return { type: EDIT_FEED, payload };
};

//초기값
const initialState = {};

const newsFeed = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION:
      console.log("reducer", action.type);
      return state;

    case ADD_FEED:
      return [...state, action.payload];
    default:
      return state;
  }
};
export default newsFeed;
