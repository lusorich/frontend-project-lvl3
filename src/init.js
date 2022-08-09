// @ts-check
import i18next from "i18next";
import resources from "./locales";
import { setLocale } from "yup";
import onChange from "on-change";
import getSubmitHandler from "./app.js";
import { render } from "./renders";

export const i18nextInstance = i18next.createInstance();
i18nextInstance.init(
  {
    lng: "ru",
    debug: true,
    resources: {
      ru: resources.ru,
    },
  },
  (err, t) => {
    if (err) return console.error("something went wrong loading", err);
    t("key");
  }
);

export default () => {
  const state = {
    status: "",
    form: {
      errorMsg: "",
      data: {
        links: [],
      },
    },
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, () => {
    render(state);
  });

  setLocale({
    string: {
      url: i18nextInstance.t("errorValidationMsg"),
    },
    mixed: {
      notOneOf: i18nextInstance.t("errorDuplicateMsg"),
    },
  });

  const formEl = document.forms[0];
  formEl.addEventListener("submit", getSubmitHandler({ state: watchedState }));
};
