export const authToken = ''; // Authentication token from project dashboard
export const tenant = ''; // Tenant ID of the tenant you want to upload to
export const channelId = ''; // Channel ID of the channel you want to upload to
const providerName = 'InternalContentLibrary';

let itemKey;

export const createItem = async (item) => {
  if (!authToken || !tenant || !channelId || !providerName)
    throw new Error(
      'Please provide all required parameters. (authToken, tenant, channelId, providerName)'
    );

  const addNewItemAPI = `https://api.appearition.com/${tenant}/api/ContentManager/AddNewItem/${channelId}?providerName=${providerName}`;

  const res = await fetch(addNewItemAPI, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': authToken,
      'api-version': 2,
    },
  });
  const data = await res.json();
  itemKey = data.Data.Key;
  return data;
};

export const uploadModel = async (modelData, key) => {
  const uploadNewFileIntoItemAPI = `https://api.appearition.com/${tenant}/api/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}`;
  const res = await fetch(uploadNewFileIntoItemAPI, {
    method: 'POST',
    body: modelData,
    headers: {
      'authentication-token': authToken,
      'api-version': 2,
    },
  });

  const data = await res.json();
  return data;
};

export const uploadImage = async (imageData, key) => {
  const uploadNewFileIntoItemAPI = `https://api.appearition.com/${tenant}/api/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}`;
  const res = await fetch(uploadNewFileIntoItemAPI, {
    method: 'POST',
    body: imageData,
    headers: {
      'authentication-token': authToken,
      'api-version': 2,
    },
  });

  const data = await res.json();
  return data;
};

export const uploadThumbnail = async (thumbnailData, key) => {
  const uploadNewThumbnailIntoItemAPI = `https://api.appearition.com/${tenant}/api/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}&isThumbnailImage=true`;
  const res = await fetch(uploadNewThumbnailIntoItemAPI, {
    method: 'POST',
    body: thumbnailData,
    headers: {
      'authentication-token': authToken,
      'api-version': 2,
    },
  });

  const data = await res.json();
  return data;
};

export const getItem = async () => {
  const getItemAPI = `https://api.appearition.com/${tenant}/api/Content/Item/${channelId}?providerName=${providerName}&itemKey=${itemKey}`;
  const res = await fetch(getItemAPI, {
    headers: {
      'authentication-token': authToken,
      'api-version': 2,
    },
  });
  const data = await res.json();
  return data;
};
