// import { createContext, useContext, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// const initialState = {
//   loginCheck: () => {}
// };

// // context provider
// export const LoginContext = createContext(initialState);

// export function LoginProvider() {
//   const navigate = useNavigate();
//   const params = useParams();

//   // login reducer
//   const dispatch = useDispatch();

//   const loginChecked = () => {
//     // 로그인 체크 후 로그인 되어 있지 않으면 로그인 창으로 이동하는 로직
//   };
//   useEffect(() => {}, []);

//   const value = {
//     loginChecked: loginChecked
//   };
//   return <LoginContext.Provider value={value}></LoginContext.Provider>;
// }

// export const useLoginContext = () => useContext(LoginContext);
