/* eslint-disable no-unused-vars */

import {randomElement, randomInt} from './util.js';

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
  return Array.from({length: size}, (_) => randomComment());
}

function randomPhotosDescriptions(size) {
  return Array.from({length: size}, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: randomDescription(),
    likes: randomInt(15, 200),
    comments: randomComments(randomInt(0, 13))
  }));
}

const generateRandomPhotosDescriptions = () => randomPhotosDescriptions(25);

export { generateRandomPhotosDescriptions, randomPhotosDescriptions };
