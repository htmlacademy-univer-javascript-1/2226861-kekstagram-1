/* eslint-disable no-unused-vars */

function isStringNoLonger(string, maxLength) {
  return string.length <= maxLength;
}

function randomInt(fromInclusive, toInclusive) {
  if (fromInclusive > toInclusive) {
    [fromInclusive, toInclusive] = [toInclusive, fromInclusive];
  }

  const min = Math.floor(fromInclusive);
  const max = Math.floor(toInclusive);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomElement(array) {
  return array[randomInt(0, array.length - 1)];
}

/*
shuffle array
author: https://stackoverflow.com/a/2450976/12737587
 */
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function shuffledIndicesArray(size) {
  return shuffle(Array(size).fill().map((_, i) => i));
}

export { isStringNoLonger, randomInt, randomElement, shuffle, shuffledIndicesArray };
