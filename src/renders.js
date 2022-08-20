import { hasErrorEl, getErrorEl, getFeedsEl, getPostsEl } from "./helpers";

export const render = (state, value, previousValue) => {
  const formEl = document.forms[0];
  const parentEl = formEl.parentElement;
  const [inputEl] = formEl.elements;
  const feedsContainer = document.querySelector(".feeds");
  const postsContainer = document.querySelector(".posts");
  const modalConatainer = document.querySelector(".modal");
  const bodyEl = document.body;

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

      const feedsEl = getFeedsEl({
        feeds: state.feeds,
      });

      const [postsEl] = getPostsEl({
        posts: state.posts,
      });

      feedsContainer?.replaceChildren(feedsEl);
      postsContainer?.replaceChildren(postsEl);

      inputEl.classList.remove("is-invalid");
      inputEl.value = "";
      inputEl.focus();

      break;
    }
    case "update": {
      if (previousValue.length < value.length) {
        const postsListEl = postsContainer.querySelector("ul");
        let newPosts = [];

        for (let i = previousValue.length; i < value.length; i++) {
          newPosts.push(value[i]);
        }

        const [, postsEl] = getPostsEl({
          posts: newPosts,
        });

        postsListEl.prepend(...postsEl);
      }
      break;
    }
    case "update_posts_read": {
      break;
    }
    case "read_post": {
      modalConatainer.classList.add("show");
      modalConatainer.style.display = "block";
      bodyEl.classList.add("modal-open");
      const div = document.createElement("div");
      div.classList.add("modal-backdrop", "fade", "show");
      bodyEl.append(div);
      break;
    }
  }
};
