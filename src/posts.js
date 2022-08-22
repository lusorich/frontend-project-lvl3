// eslint-disable-next-line consistent-return
const getPostsClickHandler = ({ state }) => (e) => {
  const { id: postId } = e.target.dataset;
  const { tagName } = e.target;
  const actualState = state.readPostProcess;

  switch (tagName) {
    case 'BUTTON': {
      e.preventDefault();
      if (!actualState.postsReadingId.includes(postId)) {
        actualState.postsReadingId.push(postId);
        actualState.status = 'read';
      }
      actualState.status = 'idle';
      actualState.postReadingId = postId;
      actualState.modalStatus = 'open';
      break;
    }
    case 'A': {
      if (!actualState.postsReadingId.includes(postId)) {
        actualState.postsReadingId.push(postId);
        actualState.status = 'read';
      }
      actualState.status = 'idle';
      break;
    }
    default:
      return '';
  }
};

export default getPostsClickHandler;
