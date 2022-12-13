/* eslint-disable no-unused-vars */

const COMMENTS_INCREMENT = 5;

const bigPicture = document.querySelector('.big-picture');

const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const caption = bigPicture.querySelector('.social__caption');

const displayedCommentsCounter = bigPicture.querySelector('.displayed__comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const pictureCloseButton = bigPicture.querySelector('#picture-cancel');

let displayedCommentsCount;

const onPanelCloseActions = [];

const onClosePanel = () => {
  document.body.classList.remove('.modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');

  onPanelCloseActions.forEach((action) => action());
  onPanelCloseActions.length = 0;
};

const onEscClickEvent = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    onClosePanel();
  }
};

const onWindowCloseClickEvent = () => {
  onClosePanel();
};

const displayComments = (count, picture) => {
  const similarCommentsFragment = document.createDocumentFragment();

  const from = displayedCommentsCount;
  const to = displayedCommentsCount + count;

  for (let i = from; i < to; i++) {
    const comment = picture.comments[i];
    const commentElement = commentTemplate.cloneNode(true);
    const commentPicture = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentText.textContent = comment.message;
    similarCommentsFragment.appendChild(commentElement);
  }
  commentsContainer.appendChild(similarCommentsFragment);

  displayedCommentsCount += count;
  displayedCommentsCounter.textContent = displayedCommentsCount;

  if (picture.comments.length === displayedCommentsCount) {
    commentsLoader.classList.add('hidden');
  }
};

const openPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  const moreCommentsLoad = () => {
    displayComments(Math.min(COMMENTS_INCREMENT, picture.comments.length - displayedCommentsCount), picture);
  };

  commentsLoader.addEventListener('click', moreCommentsLoad);
  onPanelCloseActions.push(() => {
    commentsLoader.removeEventListener('click', moreCommentsLoad);
  });

  pictureCloseButton.addEventListener('click', onWindowCloseClickEvent);
  onPanelCloseActions.push(() => {
    pictureCloseButton.removeEventListener('click', onWindowCloseClickEvent);
  });

  document.addEventListener('keydown', onEscClickEvent);
  onPanelCloseActions.push(() => {
    document.removeEventListener('keydown', onEscClickEvent);
  });

  img.src = picture.url;
  likes.textContent = picture.likes;
  caption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length.toString();

  const commentList = commentsContainer.querySelectorAll('.social__comment');
  commentList.forEach((comment) => comment.remove());

  displayedCommentsCount = 0;
  moreCommentsLoad();
};

export {openPicture};
