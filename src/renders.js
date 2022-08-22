/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
import {
  hasErrorEl,
  hasSuccessEl,
  getErrorEl,
  getFeedsEl,
  getPostsEl,
  getSuccessEl,
} from './helpers.js';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const render = (state, value, previousValue, processName) => {
  const formEl = document.forms[0];
  const parentEl = formEl.parentElement;
  const [inputEl, btnEl] = formEl.elements;
  const feedsContainer = document.querySelector('.feeds');
  const postsContainer = document.querySelector('.posts');
  const modalConatainer = document.querySelector('.modal');
  const bodyEl = document.body;

  if (processName === 'addFeedAndPostsProcess') {
    const actualState = state.addFeedAndPostsProcess;
    switch (actualState.status) {
      case 'rejected': {
        btnEl.classList.remove('disabled');
        inputEl.readOnly = false;
        hasErrorEl({ element: parentEl })
          && parentEl?.lastElementChild.remove();
        hasSuccessEl({ element: parentEl })
          && parentEl?.lastElementChild.remove();
        const errorEl = getErrorEl({
          text: actualState.error,
        });
        inputEl.classList.add('is-invalid');
        parentEl?.appendChild(errorEl);
        break;
      }
      case 'resolved': {
        btnEl.classList.remove('disabled');
        inputEl.readOnly = false;
        hasErrorEl({ element: parentEl })
          && parentEl?.lastElementChild.remove();
        hasSuccessEl({ element: parentEl })
          && parentEl?.lastElementChild.remove();

        const feedsEl = getFeedsEl({
          feeds: state.feeds,
        });

        const [postsEl] = getPostsEl({
          posts: state.posts,
        });

        const successEl = getSuccessEl({ text: actualState.successMsg });

        parentEl.appendChild(successEl);

        feedsContainer?.replaceChildren(feedsEl);
        postsContainer?.replaceChildren(postsEl);

        inputEl.classList.remove('is-invalid');
        inputEl.value = '';
        inputEl.focus();

        break;
      }
      case 'loading': {
        btnEl.classList.add('disabled');
        inputEl.readOnly = true;
        break;
      }
      default:
        return '';
    }
  }
  if (processName === 'updatePostsProcess') {
    const actualState = state.updatePostsProcess;
    switch (actualState.status) {
      case 'update': {
        if (previousValue?.newPosts.length < value?.newPosts.length) {
          const postsListEl = postsContainer.querySelector('ul');
          const newPosts = [];

          for (
            let i = previousValue?.newPosts.length;
            i < value?.newPosts.length;
            i += 1
          ) {
            newPosts.push(value?.newPosts[i]);
          }

          const [, postsEl] = getPostsEl({
            posts: newPosts,
          });

          postsListEl.prepend(...postsEl);
        }
        break;
      }
      default:
        return '';
    }
  }
  if (processName === 'readPostProcess') {
    const actualState = state.readPostProcess;
    switch (actualState.status) {
      case 'read': {
        const postId = actualState.postsReadingId[actualState.postsReadingId.length - 1];
        const linkEls = postsContainer.querySelectorAll('a');
        const actualLinkEl = [...linkEls].filter(
          (linkEl) => linkEl.dataset.id === postId,
        )?.[0];

        actualLinkEl.classList.remove('fw-bold');
        actualLinkEl.classList.add('fw-normal');
        actualLinkEl.classList.add('link-secondary');
        break;
      }
    }
    switch (actualState.modalStatus) {
      case 'open': {
        console.log('open');
        const div = document.createElement('div');
        const modalTitleEl = document.querySelector('.modal-title');
        const modalBodyEl = document.querySelector('.modal-body');
        const activePost = state.posts.filter(
          (post) => Number(post.id) === Number(actualState.postReadingId),
        )?.[0];

        modalConatainer.classList.add('show');
        modalConatainer.style.display = 'block';
        bodyEl.classList.add('modal-open');
        div.classList.add('modal-backdrop', 'fade', 'show');
        bodyEl.append(div);

        modalTitleEl.textContent = activePost.title;
        modalBodyEl.textContent = activePost.description;

        break;
      }
      case 'close': {
        const modalTitleEl = document.querySelector('.modal-title');
        const modalBodyEl = document.querySelector('.modal-body');

        modalConatainer.classList.remove('show');
        modalConatainer.style.display = '';
        bodyEl.classList.remove('modal-open');
        bodyEl.removeChild(bodyEl.lastElementChild);

        modalTitleEl.textContent = '';
        modalBodyEl.textContent = '';

        break;
      }
    }
  }
};
