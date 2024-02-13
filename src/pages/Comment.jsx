import { useParams } from "react-router-dom";
import CommentItem from "../components/comment/CommentItem";
import CommentList from "../components/comment/CommentList";

export default function Comment() {
  const { id } = useParams();
  return (
    <div>
      {/* <CommentList /> */}
      <CommentItem postId={id} />
    </div>
  );
}
