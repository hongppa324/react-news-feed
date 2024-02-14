import { doc, updateDoc } from "firebase/firestore";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import { authService, db } from "../../firebase";

const Like = ({ likes, feedId }) => {
  const userId = authService.currentUser.uid; // 로그인한 사용자
  const [isLike, setIsLike] = useState(false); // 좋아요했냐?
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수
  const [likeUsers, setLikeUsers] = useState([]);
  const isClickLike = likes?.users.includes(userId);
  // console.log(authService.currentUser);

  const onClickLike = async () => {
    const originUsers = [...likeUsers];
    let originCount = likeCount;
    const newsFeedRef = doc(db, "newsFeed", feedId);

    try {
      if (isLike === false) {
        // 좋아요 상태가 아니면, 좋아요가 되어야함.
        originUsers.push(userId);
        originCount += 1;
      } else {
        // 좋아요 상태이면, 취소가 되어야함
        let searchIdx = originUsers.indexOf(userId);
        originUsers.splice(searchIdx, 1);
        originCount -= 1;
      }

      await updateDoc(newsFeedRef, {
        likes: {
          likeCount: originCount,
          users: originUsers
        }
      });

      setIsLike(!isLike);
      setLikeCount(originCount);
      setLikeUsers(originUsers);
    } catch (error) {
      alert("치명타를 입었습니다!!!!!!!!", error);
    }
  };

  useEffect(() => {
    setLikeCount(likes.likeCount);
    setLikeUsers(likes.users);
    setIsLike(isClickLike);
  }, []);

  return (
    <span onClick={onClickLike}>
      {isLike ? <FcLike /> : <FcLikePlaceholder />} {likeCount}
    </span>
  );
};

export default Like;
