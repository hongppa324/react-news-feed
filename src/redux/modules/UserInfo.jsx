const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";

export const addUser = (input) => {
  return {
    type: ADD_USER,
    payload: {
      userId: input.userId,
      email: input.email,
      name: input.name,
    },
  };
};

export const removeUser = (input) => {
  return {
    type: REMOVE_USER,
    payload: {
      userId: input.id,
    },
  };
};

const initialState = { userInfo: [] };

const UserInfo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case REMOVE_USER:
      return initialState;
      
    default:
      return state;
  }
}

export default UserInfo