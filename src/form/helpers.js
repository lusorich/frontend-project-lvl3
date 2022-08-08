import onChange from "on-change";

// @ts-check
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

export const formOnChange = ({ formEl, inputEl, state }) =>
  onChange(state, () => {
    const parentEl = formEl.parentElement;
    if (state.form.state === "error") {
      hasErrorEl({ element: parentEl }) && parentEl?.lastElementChild.remove();

      const errorEl = getErrorEl({ text: state.form.errorMsg });
      inputEl.classList.add("is-invalid");
      parentEl?.appendChild(errorEl);
    }
    if (state.form.state === "valid") {
      hasErrorEl({ element: parentEl }) && parentEl?.lastElementChild.remove();

      inputEl.classList.remove("is-invalid");
      inputEl.value = "";
      inputEl.focus();
    }
  });
