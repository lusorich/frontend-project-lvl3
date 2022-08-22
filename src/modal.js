const getModalClickHandler = ({ state }) => (e) => {
  const isCloseBtn = e.target.dataset.bsDismiss;
  if (e.target.id === 'modal' || isCloseBtn) {
    // eslint-disable-next-line no-param-reassign
    state.readPostProcess.modalStatus = 'close';
  }
  // eslint-disable-next-line no-param-reassign
  state.readPostProcess.modalStatus = 'idle';
};

export default getModalClickHandler;
