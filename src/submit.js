/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { string } from 'yup';
import axios from 'axios';
import parser from './parsers.js';
import { update } from './timeout.js';
import { i18nextInstance } from './init.js';

const getSubmitHandler = ({ state }) => {
  const urlSchema = string().url().notOneOf([state.form.data.links]);
  const formEl = document.forms[0];

  return (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const enteredUrl = formData.get('url');

    urlSchema
      .validate(enteredUrl)
      .then(() => {
        state.addFeedAndPostsProcess.status = 'loading';
        state.form.data.links.push(enteredUrl);
      })
      .then(() => {
        axios
          .get(
            `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
              enteredUrl,
            )}`,
          )
          .then((response) => {
            const { contents } = response.data;
            const { doc } = parser(contents, 'DOMParser', 'text/html');
            const rss = doc?.querySelector('rss');

            if (rss === null) {
              throw new Error(i18nextInstance.t('errorNotValidRSS'));
            }

            const feedTitle = rss?.querySelector('title')?.textContent;
            const feedDesc = rss?.querySelector('description')?.textContent;

            const feed = {
              title: feedTitle,
              desc: feedDesc,
              id: state.feeds.length + 1,
            };

            const postsEl = rss.querySelectorAll('item');
            const posts = [...postsEl].map((post, index) => {
              const title = post.querySelector('title')?.textContent;
              const description = post.querySelector('description')?.textContent;
              const link = post.querySelector('link')?.nextSibling?.textContent;

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

            state.addFeedAndPostsProcess.status = 'resolved';

            update({
              urls: state.form.data.links,
              currentPosts: state.posts,
              feedId: feed.id,
              state,
            });
          })
          // eslint-disable-next-line no-shadow
          .catch((e) => {
            if (e.message === 'Network Error') {
              state.addFeedAndPostsProcess.error = i18nextInstance.t('errorNetwork');
              state.addFeedAndPostsProcess.status = 'rejected';
            } else {
              state.addFeedAndPostsProcess.error = e.message;
              state.addFeedAndPostsProcess.status = 'rejected';
            }
          });
      })
      // eslint-disable-next-line no-shadow
      .catch((e) => {
        state.addFeedAndPostsProcess.error = e.message;
        state.addFeedAndPostsProcess.status = 'rejected';
      });
  };
};

export default getSubmitHandler;
