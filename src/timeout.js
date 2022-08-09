import axios from "axios";
import parser from "./parsers";

export const update = ({ urls, timeout = 5000, currentPosts, feedId }) => {
  const timeoutIds = [];

  const updater = (url) => {
    const timeoutId = setTimeout(() => {
      axios
        .get(
          `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
            url
          )}`
        )
        .then((response) => {
          const { contents } = response.data;
          const { doc } = parser(contents, "DOMParser", "text/html");

          const postsEl = doc.querySelectorAll("item");
          const newPosts = [];

          [...postsEl].forEach((post) => {
            const title = post.querySelector("title")?.textContent;
            const description = post.querySelector("description")?.textContent;
            const link = post.querySelector("link")?.nextSibling?.textContent;

            const isPostExist =
              currentPosts.filter((currentPost) => currentPost.title === title)
                .length > 0;

            if (!isPostExist) {
              newPosts.push({
                title,
                description,
                link,
                id: currentPosts.length + 1 + newPosts.length,
                feedId: feedId,
              });
            }
          });
        });
      updater(url);
    }, timeout);
    timeoutIds.push(timeoutId);
  };

  urls.forEach((url) => updater(url));

  return {
    clearTimeouts: () =>
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId)),
  };
};
