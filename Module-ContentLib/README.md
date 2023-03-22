# Moudle-ContentLib

A sample project demostrating how to use the content libray module for managing assets (3d models, images, videos or any other form of media).

## Getting Started

1. Clone the project
2. Open `Appearition.js` file in `utils` folder and enter the following parameters:

- **auth token**: The auth token you created while registering the application.
- **tenant**: The tenant name of your developer account. This is the name you used when you signed up.
- **channel id / project id**: The channel id or project id in the settings page.

3. Run a local server and open the `index.html` file in your browser. You should be able to upload a 3d model and retrive to preview it in the 3d viewer.

4. The functions with APIs for uploading and retrieving assets are in `utils/Appearition.js` file. You can use these functions to integrate the content library module in your application.

## Troubleshooting

1. Make sure you have registered an application on your Appearition platform account
2. Make sure you generate an API Token for your registered application
3. Assign the following roles to the registered application:
   - InternalContentLibraryCreator
   - InternalContentLibraryEditorAll
   - InternalContentLibraryViewerAll
4. Assign your channel to the registered application.
