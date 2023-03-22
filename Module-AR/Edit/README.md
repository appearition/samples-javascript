# Introduction

This sample is an introduction to the various API method to use when editing a record for the *AR* module.
To create a record please refer to the [Create](../Create/) sample.

# You will need an account on the Appearition Platform

Making API Requests to the Appearition Platform requires an application to have been registered and an API Token to have been created for that application.

> ***Registering applications and creating API Tokens***
>
> For more information about registering an application and creating an API Token, please [click here](http://docs.appearition.com/sdk/api-access/#application_registration)

# Getting Started

1. Clone the project
2. Open 'editArRecord.html' file and enter the following parameters (lines 149-151):

- **apiUrl**: Found on the API Access screen of your Appearition platform account
- **apiToken**: The API token you created as part of registering the application.
- **myChannelId**: The channel id (aka ProjectId)

3. Run a local server and open the `editArRecord.html` file in your browser. 

# Troubleshooting

1. Make sure you have registered an application on your Appearition platform account
2. Make sure you generate an API Token for your registered application
3. Assign the following roles to the registered application:
    - ArCreator
    - ArEditorAll
    - InternalContentLibraryViewerAll
    - TenantContentLibraryViewerAll
4. Assign your channel to the registered application.
