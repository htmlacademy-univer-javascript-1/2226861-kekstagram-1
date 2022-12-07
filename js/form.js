/* eslint-disable no-unused-vars */

import { areAllCaseInsensitiveStringsUnique } from './util.js';

const maxHashtagContentLength = 19;
const maxHashtagsCount = 5;
const maxCommentLength = 140;

const pictureScaleIncrementValue = 25;
const maxPictureScaleValue = 100;
const minPictureScaleValue = 25;

const fileUploader = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const formCloseButton = imgUploadForm.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const pictureScaleDownButton = imgUploadForm.querySelector('.scale__control--smaller');
const pictureScaleUpButton = imgUploadForm.querySelector('.scale__control--bigger');
const pictureScaleValue = imgUploadForm.querySelector('.scale__control--value');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload-form--eror'
});


const validateHashCodes = (str) => {
  if (str === '') { return true; }

  const hashtagRegex = new RegExp(`^#[A-Za-z0-9]{1,${maxHashtagContentLength}}$`);
  const hashtags = str.trim().split(new RegExp('[\\s\\t]+'));

  if (hashtags.length > maxHashtagsCount) {
    return false;
  }

  if (!areAllCaseInsensitiveStringsUnique(hashtags)) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!hashtagRegex.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const validateComment = (comment) => comment.length <= maxCommentLength;

const getErrorHashtagsMessage = () => `Неверный формат ввода хэштегов! Допускаются уникальные (регистр не учитывается) хэшкоды, не более ${maxHashtagsCount} шт., с максимальной длиной ${maxHashtagContentLength}, начинающихся с '#' и разделяющиеся пробелами`;

const getErrorCommentMessage = () => `Длина комментария не может превышать ${maxCommentLength} символов!`;

pristine.addValidator(hashtagsField, validateHashCodes, getErrorHashtagsMessage);
pristine.addValidator(commentField, validateComment, getErrorCommentMessage);

const resetUploadedImage = () => {
  imgUploadPreview.src = '';
  fileUploader.value = null;
};

const onPanelCloseActions = [];

const onCloseForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');

  resetUploadedImage();
  pristine.reset();

  onPanelCloseActions.forEach((action) => action());
  onPanelCloseActions.length = 0;
};

const onEscEvt = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target !== hashtagsField && evt.target !== commentField) {
      evt.preventDefault();
      imgUploadForm.reset();
      onCloseForm();
    }
  }
};

const getPictureCurrentScaleValue = () => parseInt(pictureScaleValue.value, 10);

const setPictureScaleValue = (value) => {
  pictureScaleValue.value = `${value}%`;
  const transformCssValue = `scale(${value / 100.0})`;
  imgUploadPreview.style.transform = transformCssValue;
  imgUploadPreview.style['-webkit-transform'] = transformCssValue;
  imgUploadPreview.style['-ms-transform'] = transformCssValue;
};

const onPictureScaleUp = () => {
  const currentScale = getPictureCurrentScaleValue();
  if (currentScale <= maxPictureScaleValue - pictureScaleIncrementValue) {
    setPictureScaleValue(currentScale + pictureScaleIncrementValue);
  }
};

const onPictureScaleDown = () => {
  const currentScale = getPictureCurrentScaleValue();
  if (currentScale >= minPictureScaleValue + pictureScaleIncrementValue) {
    setPictureScaleValue(currentScale - pictureScaleIncrementValue);
  }
};

fileUploader.addEventListener('change', () => {

  const imgFile = fileUploader.files[0];

  // ensure user selected image file
  if (!imgFile.type.startsWith('image/')) {
    return;
  }

  // Mock for future homework
  imgUploadPreview.src = URL.createObjectURL(imgFile);

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscEvt);
  onPanelCloseActions.push(() => {
    document.removeEventListener('keydown', onEscEvt);
  });

  formCloseButton.addEventListener('click', onCloseForm);
  onPanelCloseActions.push(() => {
    formCloseButton.removeEventListener('click', onCloseForm);
  });

  pictureScaleUpButton.addEventListener('click', onPictureScaleUp);
  onPanelCloseActions.push(() => {
    pictureScaleUpButton.removeEventListener('click', onPictureScaleUp);
  });

  pictureScaleDownButton.addEventListener('click', onPictureScaleDown);
  onPanelCloseActions.push(() => {
    pictureScaleDownButton.removeEventListener('click', onPictureScaleDown);
  });
});


imgUploadForm.addEventListener('submit', (evt) => {
  const validForm = pristine.validate();

  if (!validForm) {
    evt.preventDefault();
    return;
  }

  onPanelCloseActions.forEach((action) => action());
  onPanelCloseActions.length = 0;
});
