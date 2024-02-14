const SET_NICKNAME = "SET_NICKNAME";

export const setNickName = (input) => {
  return {
    type: SET_NICKNAME,
    payload: {
      nickName: input.nickName
    }
  };
};
const initialState = {
  nickName: ""
};

const MyProfile = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return { ...state, nickName: action.payload };
    default:
      return state;
  }
};

export default MyProfile;
