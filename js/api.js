/* eslint-disable no-unused-vars */


const serverUrl = 'https://26.javascript.pages.academy/kekstagram/data';

const loadUserImages = (onPicturesLoaded, onError) => {
  fetch(serverUrl)
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

export {
  loadUserImages
};
