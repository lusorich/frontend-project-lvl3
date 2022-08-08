import { hasErrorEl, getErrorEl } from "./helpers";

export const render = (state) => {
  const formEl = document.forms[0];
  const parentEl = formEl.parentElement;
  const [inputEl] = formEl.elements;

  switch (state.status) {
    case "rejected": {
      hasErrorEl({ element: parentEl }) && parentEl?.lastElementChild.remove();
      const errorEl = getErrorEl({ text: state.form.errorMsg });
      inputEl.classList.add("is-invalid");
      parentEl?.appendChild(errorEl);
      break;
    }
    case "resolved": {
      hasErrorEl({ element: parentEl }) && parentEl?.lastElementChild.remove();
      inputEl.classList.remove("is-invalid");
      inputEl.value = "";
      inputEl.focus();
      break;
    }
  }
};
