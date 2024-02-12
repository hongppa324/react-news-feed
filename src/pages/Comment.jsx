import CommentItem from "../components/comment/CommentItem";
import CommentList from "../components/comment/CommentList";

export default function Comment() {
  return (
    <div>
      <div>{/* <h2>Comments</h2> */}</div>
      <CommentList />
      <CommentItem />
    </div>
  );
}
