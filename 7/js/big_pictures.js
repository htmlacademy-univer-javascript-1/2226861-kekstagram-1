/* eslint-disable no-unused-vars */

const bigPicture = document.querySelector('.big-picture');

const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const caption = bigPicture.querySelector('.social__caption');

const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const pictureCloseButton = bigPicture.querySelector('#picture-cancel');

pictureCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  document.body.classList.remove('.modal-open');
  bigPicture.classList.add('hidden');
});

function openPicture(picture) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();

    if (evt.key === 'Escape') {
      document.body.classList.remove('.modal-open');
      bigPicture.classList.add('hidden');
    }
  }, {once: true});

  // temporary mock
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  img.src = picture.url;
  likes.textContent = picture.likes;
  caption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length.toString();

  const similarCommentsFragment = document.createDocumentFragment();

  const commentList = commentsContainer.querySelectorAll('.social__comment');
  commentList.forEach((comment) => comment.remove());

  picture.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentPicture = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentText.textContent = comment.message;
    similarCommentsFragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(similarCommentsFragment);
}

export {openPicture};
