import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
//action value
const ALL_FEED = "feed/ALL_FEED";
const ADD_FEED = "feed/ADD_FEED ";
const DELETE_FEED = "feed/DELETE_FEED";
const EDIT_FEED = "feed/EDIT_FEED";

//action creator
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
const initialState = { FeedRedux: [] };

const FeedRedux = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FEED:
      const postId = action.payload;

      return deleteDoc(doc(db, "newsFeed", postId));

    default:
      return state;
  }
};
export default FeedRedux;
