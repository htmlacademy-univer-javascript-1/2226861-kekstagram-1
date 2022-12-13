/* eslint-disable no-unused-vars */

import {shuffle} from './util.js';


const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;

const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

let currentFilter = filterDefaultElement;
currentFilter.classList.add(ACTIVE_FILTER_CLASS);

let onFilterChanged = null;

const setOnFilterChangedAction = (action) => {
  onFilterChanged = action;
};

const updateFilter = (newFilter) => {
  currentFilter.classList.remove(ACTIVE_FILTER_CLASS);
  currentFilter = newFilter;
  newFilter.classList.add(ACTIVE_FILTER_CLASS);
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
const filterRandom = (photos) => shuffle(photos.slice(0, RANDOM_PHOTOS_COUNT));
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
