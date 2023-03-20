import {
  createItem,
  uploadModel,
  getItem,
  authToken,
  tenant,
  channelId,
} from './utils/Appearition.js';

const uploadButton = document.getElementById('upload-button');
const retriveButton = document.getElementById('retrive-button');
const retriveContainer = document.getElementById('retrive-container');

const fileInput = document.getElementById('model-file');
let file;

fileInput.addEventListener('change', (event) => {
  file = event.target.files[0];
});

const processUpload = async (event) => {
  event.preventDefault();

  if (!file) return;

  if (!authToken || !tenant || !channelId)
    return alert(
      'Please fill in the required fields in the utils/Appearition.js file.'
    );

  uploadButton.textContent = 'Uploading...';
  const item = {
    ProviderName: 'InternalContentLibrary',
    Key: null,
    Title: file.name,
    IsThumbnailPrivate: false,
  };

  const data = await createItem(item);

  const formData = new FormData();
  formData.append('file', file);

  const data2 = await uploadModel(formData);

  if (data2) retriveContainer.style.display = 'flex';
  uploadButton.textContent = 'Upload';
};

const retriveItem = async (event) => {
  event.preventDefault();
  retriveButton.textContent = 'Retrieving...';
  const data = await getItem();
  // console.log(data.Data.Files[0].Url);

  let modelViewer = `<model-viewer
  src=${data.Data.Files[0].Url}
  ar
  camera-controls
  touch-action="pan-y"
></model-viewer>`;

  let viewerElement = document.createElement('div');
  viewerElement.innerHTML = modelViewer;

  retriveButton.insertAdjacentElement('afterend', viewerElement.firstChild);
  retriveButton.style.display = 'none';
};

uploadButton.addEventListener('click', processUpload);
retriveButton.addEventListener('click', retriveItem);
