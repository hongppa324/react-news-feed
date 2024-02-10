import React from "react";

function FeedDeleteBtn(props) {
  const deleteHandler = () => {
    console.log("버튼", props);
  };

  return <button onClick={deleteHandler} />;
}

export default FeedDeleteBtn;
