/* eslint-disable no-unused-vars */


const BASE_SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';

const loadUserImages = (onPicturesLoaded, onError) => {
  fetch(`${BASE_SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error on pictures loading: ${response.statusText} - ${response.status}`);
    })
    .then((pictures) => {
      onPicturesLoaded(pictures);
    })
    .catch((err) => {
      onError(err);
    });
};

const makeFormData = (data) => new FormData(data);

const sendPictureForm = (form, onSuccess, onError) => {
  fetch(
    BASE_SERVER_URL,
    {
      method: 'POST',
      credentials: 'same-origin',
      body: makeFormData(form),
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error on picture form send: ${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

export {
  loadUserImages,
  sendPictureForm
};
