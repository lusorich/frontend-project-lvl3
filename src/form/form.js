import { string } from "yup";

const rssForm = ({ formOnChange }) => {
  const state = {
    form: {
      state: "",
      errorMsg: "",
      data: {
        urlList: [],
      },
    },
  };

  const urlSchema = string().url().notOneOf([state.form.data.urlList]);

  const formEl = document.forms[0];
  const [input] = formEl.elements;

  const watchedState = formOnChange({ formEl, inputEl: input, state });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const enteredUrl = formData.get("url");

    urlSchema
      .validate(enteredUrl)
      .then(() => {
        watchedState.form.state = "valid";
        watchedState.form.data.urlList.push(enteredUrl);
      })
      .catch((e) => {
        watchedState.form = {
          ...watchedState.form,
          state: "error",
          errorMsg: e.message,
        };
      });
  });
};

const init = ({ formOnChange }) => {
  rssForm({
    formOnChange,
  });
};

export default init;
