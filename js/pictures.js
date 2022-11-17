/* eslint-disable no-unused-vars */

import {generateRandomPhotosDescriptions} from './data.js';
import {openPicture} from './big-pictures.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const generatedPhotos = generateRandomPhotosDescriptions();

generatedPhotos.forEach((photo) => {
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
