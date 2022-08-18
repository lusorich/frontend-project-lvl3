import { string } from "yup";
import axios from "axios";
import parser from "./parsers";
import { update } from "./timeout";

const getSubmitHandler = ({ state }) => {
  const urlSchema = string().url().notOneOf([state.form.data.links]);
  const formEl = document.forms[0];

  return (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const enteredUrl = formData.get("url");

    urlSchema
      .validate(enteredUrl)
      .then(() => {
        state.status = "pending";
        state.form.data.links.push(enteredUrl);
      })
      .then(() => {
        axios
          .get(
            `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
              enteredUrl
            )}`
          )
          .then((response) => {
            const { contents } = response.data;
            const { doc } = parser(contents, "DOMParser", "text/html");

            const feedTitle = doc?.querySelector("title")?.textContent;
            const feedDesc = doc?.querySelector("description")?.textContent;

            const feed = {
              title: feedTitle,
              desc: feedDesc,
              id: state.feeds.length + 1,
            };

            const postsEl = doc.querySelectorAll("item");
            const posts = [...postsEl].map((post, index) => {
              const title = post.querySelector("title")?.textContent;
              const description =
                post.querySelector("description")?.textContent;
              const link = post.querySelector("link")?.nextSibling?.textContent;

              return {
                title,
                description,
                link,
                id: index + state.posts.length + 1,
                feedId: feed.id,
              };
            });

            state.feeds = [...state.feeds, feed];
            state.posts = [...state.posts, ...posts];
            state.status = "resolved";

            const { clearTimeouts } = update({
              urls: state.form.data.links,
              currentPosts: state.posts,
              feedId: feed.id,
              state,
            });
          });
      })
      .catch((e) => {
        state.status = "rejected";
        state.form = {
          ...state.form,
          errorMsg: e.message,
        };
      });
  };
};

export default getSubmitHandler;