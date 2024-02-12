// import React from "react";
// import { storage } from "../../../api/firebase";
// import styled from "styled-components";
// import { type } from "@testing-library/user-event/dist/type";

// export default function MyInfo({ imageFile, isEditing, editedMyInfo, setImageFile, editTextHandler }) {
//   // 유저 정보를 회원가입 파일에서 가져오기
//   // const {userInfo} ;
//   // const { userId } = userInfo;

//   const saveImageFile = () => {};

//   return (
//     <>
//       <MyInfoContainer>
//         {!isEditing ? (
//           <>
//             <MyName>{editedMyInfo.name}</MyName>
//             <MyImage>
//               <img src="" alt=""></img>
//             </MyImage>
//             <MyNickName>{editedMyInfo.nickname}</MyNickName>
//           </>
//         ) : (
//           <>
//             <NameInput
//               type="text"
//               value={editedMyInfo.name}
//               onChange={editTextHandler}
//               placeholder="이름을 입력해주세요."
//             ></NameInput>
//             <MyProfileImage></MyProfileImage>
//             <NickNameInput
//               type="text"
//               value={editedMyInfo.nickname}
//               onChange={editTextHandler}
//               placeholder="닉네임을 입력해주세요."
//             ></NickNameInput>
//           </>
//         )}
//       </MyInfoContainer>
//     </>
//   );
// }

// const MyInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const MyName = styled.div``;
// const MyImage = styled.div``;
// const MyNickName = styled.div``;

// const NameInput = styled.input``;
// const NickNameInput = styled.input``;
// const MyProfileImage = styled.div``;
