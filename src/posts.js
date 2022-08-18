const getPostsClickHandler = () => {
  return (e) => {
    e.preventDefault();
    const { id: postId, feedId } = e.target.dataset;
    const { tagName } = e.target;
  };
};

export default getPostsClickHandler;
