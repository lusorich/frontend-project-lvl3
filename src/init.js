import i18next from 'i18next';
import { setLocale } from 'yup';
import onChange from 'on-change';
import resources from './locales/index.js';
// eslint-disable-next-line import/no-cycle
import getSubmitHandler from './submit.js';
// eslint-disable-next-line import/no-cycle
import { render } from './renders.js';
import getPostsClickHandler from './posts.js';
import getModalClickHandler from './modal.js';

export const i18nextInstance = i18next.createInstance();
i18nextInstance.init(
  {
    lng: 'ru',
    debug: true,
    resources: {
      ru: resources.ru,
    },
  },
  (err, t) => {
    if (err) return console.error('something went wrong loading', err);
    return t('key');
  },
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
      status: 'idle',
      error: '',
      successMsg: i18nextInstance.t('successMsg'),
    },
    updatePostsProcess: {
      status: 'idle',
      error: '',
      newPosts: [],
    },
    readPostProcess: {
      status: 'idle',
      modalStatus: 'idle',
      postReadingId: '',
      postsReadingId: [],
      error: '',
    },
  };
  const formEl = document.forms[0];
  const postsContainerEl = document.querySelector('.posts');
  const modalContainerEl = document.querySelector('#modal');

  const watchedState = onChange(state, (path, value, previousValue) => {
    const processName = path.split('.')?.[0];
    render(state, value, previousValue, processName);
  });

  setLocale({
    string: {
      url: i18nextInstance.t('errorValidationMsg'),
    },
    mixed: {
      notOneOf: i18nextInstance.t('errorDuplicateMsg'),
    },
  });

  formEl.addEventListener('submit', getSubmitHandler({ state: watchedState }));

  postsContainerEl?.addEventListener(
    'click',
    getPostsClickHandler({ state: watchedState }),
  );

  modalContainerEl?.addEventListener(
    'click',
    getModalClickHandler({ state: watchedState }),
  );
};
