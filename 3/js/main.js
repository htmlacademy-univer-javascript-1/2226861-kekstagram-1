/* eslint-disable no-unused-vars */


function randomInt(fromInclusive, toInclusive) {
  if (fromInclusive > toInclusive) {
    [fromInclusive, toInclusive] = [toInclusive, fromInclusive];
  }

  const min = Math.floor(fromInclusive);
  const max = Math.floor(toInclusive);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isStringNoLonger(string, maxLength) {
  return string.length <= maxLength;
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

const DESCRIPTIONS = [
  'Фотография была сделана на мой телефон',
  'Для этого снимка мне пришлось потратить полчаса на настройку камеры',
  'На этой фотографии мог быть изображен Кекс',
  'А здесь мог был быть я с Кексой',
  'Ммм... Кексов захотелось',
  'Сколько души в этой фотографии!'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const FIRSTNAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

const SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольниц',
  'Нионго',
  'Ирвинг'
];

const randomDescription = () => randomElement(DESCRIPTIONS);

const randomCommentMessage = () => randomElement(COMMENTS);

const randomName = () => `${randomElement(FIRSTNAMES)} ${randomElement(SURNAMES)}`;

function randomCommentId() {
  return randomInt(0, 10000000);
}

function randomComment() {
  return {
    id: randomCommentId(),
    avatar: `img/avatar-${randomInt(1, 6)}.svg`,
    message: randomCommentMessage(),
    name: randomName()
  };
}

function randomComments(size) {
  const comments = [];

  for (let i = 0; i < size; i++) {
    comments.push(randomComment());
  }
  return comments;
}

function randomPhotosDescriptions(size) {
  const pd = [];

  const descriptionIds = shuffledIndicesArray(size);
  const urlNums = shuffledIndicesArray(size);

  for (let i = 0; i < size; i++) {
    pd.push({
      id: descriptionIds[i],
      url: `photos/${urlNums[i]}.jpg`,
      description: randomDescription(),
      likes: randomInt(15, 200),
      comments: randomComments(randomInt(0, 4))
    });
  }
  return pd;
}

randomPhotosDescriptions(25);
