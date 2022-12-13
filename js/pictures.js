/* eslint-disable no-unused-vars */

import {openPicture} from './big-pictures.js';
import {loadUserImages} from './api.js';
import {showError} from './error.js';
import {filterPhotos, setOnFilterChangedAction} from './filter.js';
import {debounce} from './optimization.js';


const rerenderDelay = 500;
const pictureClass = 'picture';
const photoTemplate = document.querySelector('#picture').content.querySelector(`.${pictureClass}`);
const similarListFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');


const displayPhotos = (photos) => {
  // remove old pictures
  for (let i = picturesContainer.childElementCount - 1; i >= 0; i--) {
    if (picturesContainer.children[i].classList.contains(pictureClass)) {
      picturesContainer.removeChild(picturesContainer.children[i]);
    }
  }

  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.addEventListener('click', () => {
      openPicture(photo);
    });
    similarListFragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(similarListFragment);
};

const onPhotosLoaded = (photos) => {
  const displayPhotosDebounce = debounce(
    () => displayPhotos(filterPhotos(photos)),
    rerenderDelay
  );

  setOnFilterChangedAction(() => displayPhotosDebounce());

  displayPhotos(filterPhotos(photos));

  imgFilters.classList.remove('img-filters--inactive');
};


loadUserImages(onPhotosLoaded, showError);
