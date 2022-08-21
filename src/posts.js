const getPostsClickHandler = ({ state }) => {
  return (e) => {
    const { id: postId, feedId } = e.target.dataset;
    const { tagName } = e.target;
    const actualState = state.readPostProcess;

    switch (tagName) {
      case "BUTTON": {
        e.preventDefault();
        if (!actualState.postsReadingId.includes(postId)) {
          actualState.postsReadingId.push(postId);
          actualState.status = "read";
        }
        actualState.status = "idle";
        actualState.postReadingId = postId;
        actualState.modalStatus = "open";
        break;
      }
      case "A": {
        if (!actualState.postsReadingId.includes(postId)) {
          actualState.postsReadingId.push(postId);
          actualState.status = "read";
        }
        actualState.status = "idle";
        break;
      }
    }
  };
};

export default getPostsClickHandler;
