/* eslint-disable no-unused-vars */
import { areAllCaseInsensitiveStringsUnique, removeClass, findCheckedRadioButton } from './util.js';

const maxHashtagContentLength = 19;
const maxHashtagsCount = 5;
const maxCommentLength = 140;

const pictureScaleIncrementValue = 25;
const maxPictureScaleValue = 100;
const minPictureScaleValue = 25;

const filterMinValues = new Map([
  ['chrome', 0],
  ['sepia', 0],
  ['marvin', 0],
  ['phobos', 0],
  ['heat', 1]
]);

const filterMaxValues = new Map([
  ['chrome', 1],
  ['sepia', 1],
  ['marvin', 100],
  ['phobos', 3],
  ['heat', 3]
]);

const filterDefaultValues = new Map([
  ['chrome', 1],
  ['sepia', 1],
  ['marvin', 100],
  ['phobos', 3],
  ['heat', 3]
]);

const filterSteps = new Map([
  ['chrome', 0.1],
  ['sepia', 0.1],
  ['marvin', 1],
  ['phobos', 0.1],
  ['heat', 0.1]
]);

const filterUnitSuffixes = new Map([
  ['chrome', ''],
  ['sepia', ''],
  ['marvin', '%'],
  ['phobos', 'px'],
  ['heat', '']
]);

const filterStyleNames = new Map([
  ['chrome', 'grayscale'],
  ['sepia', 'sepia'],
  ['marvin', 'invert'],
  ['phobos', 'blur'],
  ['heat', 'brightness']
]);

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
const effectRadios = imgUploadForm.querySelectorAll('.effects__radio');
const pictureEffectValue = imgUploadForm.querySelector('.effect-level__value');
const pictureEffectSlider = imgUploadForm.querySelector('.effect-level__slider');

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

const onEffectSelect = (evt) => {
  const selectedStyle = evt.currentTarget.value;
  removeClass(imgUploadPreview, (className) => className.startsWith('effects__preview--'));

  if (selectedStyle !== 'none') {
    imgUploadPreview.classList.add(`effects__preview--${selectedStyle}`);

    pictureEffectSlider.noUiSlider.updateOptions({
      range: {
        min: filterMinValues.get(selectedStyle),
        max: filterMaxValues.get(selectedStyle)
      },
      step: filterSteps.get(selectedStyle),
      start: filterDefaultValues.get(selectedStyle),
      connect: 'lower',
    });
    pictureEffectSlider.classList.remove('hidden');

  } else {
    imgUploadPreview.style.filter = '';
    pictureEffectSlider.classList.add('hidden');
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

  effectRadios.forEach((effectRadio) => effectRadio.addEventListener('click', onEffectSelect));
  onPanelCloseActions.push(() => {
    effectRadios.forEach((effectRadio) => effectRadio.removeEventListener('click', onEffectSelect));
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

pictureEffectSlider.classList.add('hidden');
noUiSlider.create(pictureEffectSlider, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
});

pictureEffectSlider.noUiSlider.on('update', () => {
  pictureEffectValue.value = pictureEffectSlider.noUiSlider.get();

  const effect = findCheckedRadioButton(effectRadios).value;

  imgUploadPreview.style.filter = `${filterStyleNames.get(effect)}(${pictureEffectValue.value}${filterUnitSuffixes.get(effect)})`;
});
