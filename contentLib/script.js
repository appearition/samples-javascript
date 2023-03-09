import { createItem, uploadModel, getItem } from './utils/Appearition.js';

const uploadButton = document.getElementById('upload-button');
const retriveButton = document.getElementById('retrive-button');

const fileInput = document.getElementById('model-file');
let file;
let fileKey;

fileInput.addEventListener('change', (event) => {
  file = event.target.files[0];
});

const processUpload = async (event) => {
  event.preventDefault();

  const item = {
    ProviderName: 'InternalContentLibrary',
    Key: null,
    Title: file.name,
    IsThumbnailPrivate: false,
  };

  const data = await createItem(item);

  fileKey = data.Data.Key;

  const formData = new FormData();
  formData.append('file', file);

  const data2 = await uploadModel(formData, fileKey);
  console.log(data2);
};

const retriveItem = async (event) => {
  event.preventDefault();
  const data = await getItem(fileKey);
  console.log(data.Data.Files[0].Url);
};

uploadButton.addEventListener('click', processUpload);
retriveButton.addEventListener('click', retriveItem);
