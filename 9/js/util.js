/* eslint-disable no-unused-vars */

const randomInt = (fromInclusive, toInclusive) => {
  if (fromInclusive > toInclusive) {
    [fromInclusive, toInclusive] = [toInclusive, fromInclusive];
  }

  const min = Math.floor(fromInclusive);
  const max = Math.floor(toInclusive);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomElement = (array) => array[randomInt(0, array.length - 1)];

/*
shuffle array
author: https://stackoverflow.com/a/2450976/12737587
 */
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = randomInt(0, currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const removeClass = (element, filter) => {
  for (let i = element.classList.length - 1; i >= 0; i--) {
    const className = element.classList[i];
    if (filter(className)) {
      element.classList.remove(className);
      return;
    }
  }
};

const findCheckedRadioButton = (radios) => {
  for (const radio of radios) {
    if (radio.checked) { return radio; }
  }
  return null;
};

const areAllCaseInsensitiveStringsUnique = (strings) => new Set(strings.map((hs) => hs.toLowerCase())).size === strings.length;

export {
  randomInt,
  randomElement,
  shuffle,
  areAllCaseInsensitiveStringsUnique,
  removeClass,
  findCheckedRadioButton
};
