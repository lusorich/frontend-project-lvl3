const getModalClickHandler = ({ state }) => {
  return (e) => {
    const isCloseBtn = e.target.dataset.bsDismiss;
    if (e.target.id === "modal" || isCloseBtn) {
      state.readPostProcess.modalStatus = "close";
    }
    state.readPostProcess.modalStatus = "idle";
  };
};

export default getModalClickHandler;
