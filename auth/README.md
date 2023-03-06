# Login-Sample-Javascript

A sample project demostrating how to use the autheticate API to login to the Appearition platform for web applications built with javascript.

## Getting Started

Before proceeding, please [sign up](https://login.appearition.com/arcms08/account/register?plan=developer) to the platform and create a new developer account.

### Step 1:

The API url for the login (user authentication) is: https://api.appearition.com/{tenant}/api/Account/Authenticate/{id}

### Step 2:

The API requires the following parameters:

1. **tenant**: The tenant name of your developer account. This is the name you used when you signed up.
2. **channel id / project id**: The channel id or project id of the channel you want to login to. You can find this in the channel settings page.
3. **app id**: The unique id you created while registering the application.
4. **auth token**: The auth token you created while registering the application.

### Step 3:

Enter these paramters in the script.js file.

That's it! Now run a local server and open the `index.html` file in your browser. You should be able to see the login page.
