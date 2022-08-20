const getPostsClickHandler = ({ state }) => {
  return (e) => {
    const { id: postId, feedId } = e.target.dataset;
    const { tagName } = e.target;

    switch (tagName) {
      case "BUTTON": {
        e.preventDefault();
        if (!state.postsRead.includes(postId)) {
          state.status = "update_posts_read";
          state.postsRead.push(postId);
        }
        state.status = "read_post";
        state.readPost = postId;
        break;
      }
      case "A": {
        if (!state.postsRead.includes(postId)) {
          state.status = "update_posts_read";
          state.postsRead.push(postId);
        }
        break;
      }
    }
  };
};

export default getPostsClickHandler;
