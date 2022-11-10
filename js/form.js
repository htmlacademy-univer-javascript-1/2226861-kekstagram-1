/* eslint-disable no-unused-vars */

const fileUploader = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

fileUploader.addEventListener('change', (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});
