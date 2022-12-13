/* eslint-disable no-unused-vars */

import {shuffle} from './util.js';


const activeFilterClass = 'img-filters__button--active';
const randomPhotosCount = 10;

const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

let currentFilter = filterDefaultElement;
currentFilter.classList.add(activeFilterClass);

let onFilterChanged = null;

const setOnFilterChangedAction = (action) => {
  onFilterChanged = action;
};

const updateFilter = (newFilter) => {
  currentFilter.classList.remove(activeFilterClass);
  currentFilter = newFilter;
  newFilter.classList.add(activeFilterClass);
};


const onFilterClick = (evt) => {
  const target = evt.target;
  if (target === currentFilter) { return; }

  updateFilter(target);
  if (onFilterChanged !== null) {
    onFilterChanged();
  }
};

const filterDefault = (photos) => photos;
const filterRandom = (photos) => shuffle(photos.slice(0, randomPhotosCount));
const filterDiscussed = (photos) => photos.slice().sort((first, second) => second.comments.length - first.comments.length);

const filterPhotos = (photos) => {
  switch (currentFilter) {
    case filterDefaultElement:
      return filterDefault(photos);
    case filterRandomElement:
      return filterRandom(photos);
    case filterDiscussedElement:
      return filterDiscussed(photos);
  }
};

filterDefaultElement.onclick = onFilterClick;
filterRandomElement.onclick = onFilterClick;
filterDiscussedElement.onclick = onFilterClick;


export {
  filterPhotos,
  setOnFilterChangedAction
};
