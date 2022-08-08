export const getErrorEl = ({ text }) => {
  const errorEl = document.createElement("p");
  errorEl.classList.add(
    "feedback",
    "m-0",
    "position-absolute",
    "small",
    "text-danger"
  );
  errorEl.textContent = text;
  return errorEl;
};

export const hasErrorEl = ({ element }) =>
  element?.lastElementChild?.classList.contains("text-danger") ? true : false;
