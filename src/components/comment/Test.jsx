// import React from "react";
// import CommentList from "./CommentList";

// export default function Test({
//   comment,
//   handleCompleteEdit,
//   handleEdit,
//   onDeleteHandler,
//   editedContent,
//   handleInputChange
// }) {
//   const { id, createdAt, isEditing, content } = comment;
//   return (
//     <>
//       <li key={id}>
//         {/* <p>{comment.content}</p> */}
//         <p>{createdAt}</p>
//         {isEditing ? (
//           <>
//             <textarea value={editedContent} onChange={handleInputChange} />
//             <button onClick={() => handleCompleteEdit(id)}>완료</button>
//           </>
//         ) : (
//           <>
//             <p>{content}</p>
//             <button onClick={() => handleEdit(id)}>수정</button>
//             <button onClick={() => onDeleteHandler(id)}>삭제</button>
//           </>
//         )}
//         {/* 다른 필드들도 필요에 따라 표시 */}
//       </li>
//     </>
//   );
// }
