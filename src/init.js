// @ts-check
import i18next from "i18next";
import resources from "./locales";
import { setLocale } from "yup";
import onChange from "on-change";
import getSubmitHandler from "./submit.js";
import { render } from "./renders";
import getPostsClickHandler from "./posts";
import getModalClickHandler from "./modal";

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
    form: {
      data: {
        links: [],
      },
    },
    feeds: [],
    posts: [],
    addFeedAndPostsProcess: {
      status: "idle",
      error: "",
      successMsg: i18nextInstance.t("successMsg"),
    },
    updatePostsProcess: {
      status: "idle",
      error: "",
      newPosts: [],
    },
    readPostProcess: {
      status: "idle",
      modalStatus: "idle",
      postReadingId: "",
      postsReadingId: [],
      error: "",
    },
  };
  const formEl = document.forms[0];
  const postsContainerEl = document.querySelector(".posts");
  const modalContainerEl = document.querySelector("#modal");

  // addFeedAndPostsProcess = {
  //   status: "idle" | "loading" | "resolved" | "rejected"
  // }
  // updatePostsProcess = {
  //   status: "idle" | "resolved" | "rejected"
  // }
  // readPostProcess = {
  //   status: "idle" | "read",
  //   modalStatus: "idle" | "open" | "close"
  // }

  const watchedState = onChange(state, (path, value, previousValue) => {
    const processName = path.split(".")?.[0];
    render(state, value, previousValue, processName);
  });

  setLocale({
    string: {
      url: i18nextInstance.t("errorValidationMsg"),
    },
    mixed: {
      notOneOf: i18nextInstance.t("errorDuplicateMsg"),
    },
  });

  formEl.addEventListener("submit", getSubmitHandler({ state: watchedState }));

  postsContainerEl?.addEventListener(
    "click",
    getPostsClickHandler({ state: watchedState })
  );

  modalContainerEl?.addEventListener(
    "click",
    getModalClickHandler({ state: watchedState })
  );
};
