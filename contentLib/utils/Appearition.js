const authToken = ''; // Authentication token from project dashboard
const tenant = ''; // Tenant ID of the tenant you want to upload to
const channelId = ''; // Channel ID of the channel you want to upload to
const providerName = 'InternalContentLibrary';

export const createItem = async (item) => {
  const res = await fetch(
    `https://api.appearition.com/${tenant}/api/ContentManager/AddNewItem/${channelId}?providerName=${providerName}`,
    {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'authentication-token': authToken,
        'api-version': 2,
      },
    }
  );
  const data = await res.json();
  return data;
};

export const uploadModel = async (modelData, key) => {
  const res = await fetch(
    `https://api.appearition.com/${tenant}/api/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${key}`,
    {
      method: 'POST',
      body: modelData,
      headers: {
        'authentication-token': authToken,
        'api-version': 2,
      },
    }
  );

  const data = await res.json();
  return data;
};

export const uploadImage = async (imageData, key) => {
  const res = await fetch(
    `https://api.appearition.com/arcms08/api/ContentManager/UploadNewFileIntoItem/26?providerName=InternalContentLibrary&itemKey=${key}`,
    {
      method: 'POST',
      body: imageData,
      headers: {
        'authentication-token': authToken,
        'api-version': 2,
      },
    }
  );

  const data = await res.json();
  return data;
};

export const uploadThumbnail = async (thumbnailData, key) => {
  const res = await fetch(
    `https://api.appearition.com/${tenant}/api/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${key}&isThumbnailImage=true`,
    {
      method: 'POST',
      body: thumbnailData,
      headers: {
        'authentication-token': authToken,
        'api-version': 2,
      },
    }
  );

  const data = await res.json();
  return data;
};

export const getItem = async (key) => {
  const res = await fetch(
    `https://api.appearition.com/${tenant}/api/Content/Item/${channelId}?providerName=${providerName}&itemKey=${key}`,
    {
      headers: {
        'authentication-token': authToken,
        'api-version': 2,
      },
    }
  );
  const data = await res.json();
  return data;
};
