// @ts-check
import { i18nextInstance } from "./init";

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

export const getSuccessEl = ({ text }) => {
  const successEl = document.createElement("p");
  successEl.classList.add(
    "feedback",
    "m-0",
    "position-absolute",
    "small",
    "text-success"
  );
  successEl.textContent = text;
  return successEl;
};

export const hasSuccessEl = ({ element }) =>
  element?.lastElementChild?.classList.contains("text-success") ? true : false;

export const hasErrorEl = ({ element }) =>
  element?.lastElementChild?.classList.contains("text-danger") ? true : false;

export const getFeedsEl = ({ feeds }) => {
  const mainContainer = document.createElement("div");
  const feedsContainer = document.createElement("ul");
  const feedTitleContainer = document.createElement("div");
  const feedTitle = document.createElement("h2");

  mainContainer.classList.add("card", "border-0");
  feedsContainer.classList.add("list-group", "border-0", "rounded-0");
  feedTitle.classList.add("card-title", "h4");
  feedTitleContainer.classList.add("card-body");

  feedTitle.textContent = i18nextInstance.t("feedsTitle");
  feedTitleContainer.append(feedTitle);

  const feedsEl = feeds.map((feed) => {
    const feedEl = document.createElement("li");
    const feedTitleEl = document.createElement("h3");
    const feedDescEl = document.createElement("p");

    feedTitleEl.classList.add("h6", "m-0");
    feedEl.classList.add("list-group-item", "border-0", "border-end-0");
    feedDescEl.classList.add("m-0", "small", "text-black-50");

    feedTitleEl.textContent = feed.title;
    feedDescEl.textContent = feed.desc;

    feedEl.append(feedTitleEl, feedDescEl);

    return feedEl;
  });

  feedsContainer.append(...feedsEl);
  mainContainer.append(feedTitleContainer, feedsContainer);

  return mainContainer;
};

export const getPostsEl = ({ posts }) => {
  const mainContainer = document.createElement("div");
  const postsTitleContainer = document.createElement("div");
  const postsTitle = document.createElement("h2");
  const postsContainer = document.createElement("ul");

  mainContainer.classList.add("card", "border-0");
  postsTitleContainer.classList.add("card-body");
  postsTitle.classList.add("card-title", "h4");
  postsContainer.classList.add("list-group", "border-0", "rounded-0");

  postsTitle.textContent = i18nextInstance.t("postsTitle");
  postsTitleContainer.append(postsTitle);

  const postsEl = posts.map((post) => {
    const liEl = document.createElement("li");
    const linkEl = document.createElement("a");
    const btnEl = document.createElement("button");

    liEl.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start",
      "border-0",
      "border-end-0",
      "py-2"
    );
    linkEl.classList.add("fw-bold");
    btnEl.classList.add("btn", "btn-outline-primary", "btn-sm");

    linkEl.href = post.link;
    linkEl.target = "_blank";
    linkEl.rel = "noopener noreferrer";
    linkEl.dataset.id = post.id;
    linkEl.dataset.feedId = post.feedId;
    linkEl.textContent = post.title;

    liEl.dataset.id = post.id;
    liEl.dataset.feedId = post.feedId;

    btnEl.dataset.id = post.id;
    btnEl.dataset.feedId = post.feedId;
    btnEl.textContent = i18nextInstance.t("viewing");

    liEl.append(linkEl, btnEl);
    return liEl;
  });

  postsContainer.append(...postsEl);
  mainContainer.append(postsContainer);

  return [mainContainer, postsEl];
};
