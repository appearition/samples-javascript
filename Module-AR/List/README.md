# Introduction

This sample project will show you how to invoke the List API method of the *AR* module.

In this project you will build a simple HTML page that simply lists all of the AR records in your channel/project. It will display any target images and let you view the media linked to the AR Experience.

# Create sample project file

This project will be a one page HTML. Let's go ahead and create a simple structure. We need to reference the [JQuery](https://jquery.com/) library as the Appearition JS SDK requires it. [Bootstrap](https://getbootstrap.com/docs/3.3/) is optional and used for styling our sample project only.

``` html
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
	<h1>List AR Experiences</h1>

    <p>This sample project will connect to the Appearition Platform and download records from the AR module. </p>

    <div class="panel panel-default">
        <div class="panel-heading">AR Records</div>
        <div class="panel-body" id="arExperiences">None Loaded</div>
        <div class="panel-footer">
            <button class="btn btn-primary" onclick="javascript: loadArExperiences();">Get records</button>
        </div>
    </div>

    <br />

    <div class="panel panel-default">
        <div class="panel-heading">Messages</div>
        <div class="panel-body" id="messages">Starting</div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</html>
```

# Reference core files

Next we want to reference the Appearition Platform JS SDK files. For the latest version please see the [API Documentation](/sdk/js/API/AppearitionSDKForJs_ChangeLog/).

``` html
<script src="https://s3-ap-southeast-2.amazonaws.com/cdn.appearition.com/sdk/js/appearition.1.0.0.min.js"></script>
<script src="https://s3-ap-southeast-2.amazonaws.com/cdn.appearition.com/sdk/js/appearition.authentication.1.0.0.min.js"></script>
```

# Reference module files

Then we want to reference the module which will give us the records from the *AR* module.
``` html
<script src="https://s3-ap-southeast-2.amazonaws.com/cdn.appearition.com/sdk/js/appearition.arTargetImageAndMedia.1.0.0.min.js"></script>
```

# Verify access to the Appearition Platform

Making API Requests to the Appearition Platform requires an application to have been registered and an API Token to have been created for that application.

> ***Registering applications and creating API Tokens***
>
> For more information about registering an application and creating an API Token, please [click here](/sdk/api-access/#application_registration)

Verification is the first step in using the Appearition SDK. It validates if the API Token is still valid and if not, you can show a relevant message to your
users. Any attempts to invoke API requests with an invalid API Token will immediately result in an HTTP 401 error.

``` html
<script type="text/javascript">

    $(document).ready(function () {
        Appearition.Authentication.VerifySession('<API URL>', '<API Token>', '<Channel Id>')
                    .then(
                        () =>{
                            // Session IS verified
                        },
                        (error) =>{
                            // Session NOT verified
                        }
                    );

	});

</script>
```

<table>
<tr><th colspan=2>Parameters</th></tr>
<tr>
	<td>API URL</td>
	<td>The Appearition Platform is available across numerous regions. As such, each region will have its own dedicated URL. To find out which is your URL, please view the API Access page in the platform portal. <a href="/sdk/api-access" target="_blank">Read more...</a></td>
</tr>
<tr>
	<td>API Token</td>
	<td>This will give your application access to resources on the Appearition Platform without requiring user login.</td>
</tr>
<tr>
	<td>Channel Id</td>
	<td>All content is organised in channels on the platform. Think of a channel as a workspace or a project where you can group and isolate similar content together. <a href="/admin/channel/" target="_blank">Learn about channels</td>
</tr>
</table>

# List AR Experiences

Now we will add the functionality to retrieve a list of all AR records from our channel/project in the Appearition Platform. 

``` javascript
function loadArExperiences() {
    $('#arExperiences').html('Loading...');

    Appearition.ArTargetImageAndMedia.List(
        JSON.stringify({
            Page: 0,
            RecordsPerPage: 10,
            IncludeTargetImages: true,
            IncludeMedia: true
        }),
        {
            channelId: myChannelId,
            beforeSend: function (request) {
                PrintMessage("Calling ArTarget/List API...");
            },
            complete: function () {
                PrintMessage("Call to ArTarget/List API completed");
            },
            success: function (data) {
                loadArTargets(data.ArTargets);
            },
            error: function (errorArr, xhr) {                    
                handleResponseErrors(errorArr, xhr);
                $('#arExperiences').innerHTML = 'Loading failed';
            }
        }
    );
}

```

The API method which retrieves the records from the module is "ArTarget/List". The JS SDK encapsulates that WebAPI call in a convenient function *Appearition.ArTargetImageAndMedia.List* which takes in two parameters:

<table>
<tr><th colspan=2>First parameter: Appearition.ListRequest. </th></tr>
<tr>
	<td>Page</td>
	<td>Results are paged and this parameter informs the server on which page to return. Note 0 = first page</td>
</tr>
<tr>
	<td>RecordsPerPage</td>
	<td>Informs the server how many records to retrieve per page</td>
</tr>
<tr>
	<td>IncludeTargetImages</td>
	<td>A switch which tells the server if you want the collection of Target images to be returned in the results. Values are true or false</td>
</tr>
<tr>
	<td>IncludeMedia</td>
	<td>A switch which tells the server if you want the collection of media to be returned in the results. Values are true or false</td>
</tr>
</table>

The List API has more fields which can be used. The above are the minimum fields used in this sample project. For a complete list of properties please visit the Swagger page under *API Access* in your platform account. You can discover and try the *ArTarget/List* API under the verson 2 of the *AR Target Image and Media* module

<table>
<tr><th colspan=2>Second parameter: Appearition.RequestOptions</th></tr>
<tr>
	<td>beforeSend</td>
	<td>Optional function if you want to perform any actions before the request to the Appearition platform is made</td>
</tr>
<tr>
	<td>complete</td>
	<td>Optional function if you want to perform any actions once the request has completed to the Appearition platform</td>
</tr>
<tr>
	<td>success</td>
	<td>Function to process the results of a successful request to the Appearition Platform</td>
</tr>
<tr>
	<td>error</td>
	<td>Function to process the any failures with the request to the Appearition Platform</td>
</tr>
<tr>
	<td>channelId</td>
	<td>Optional paramater to override the Channel Id that is sent as part of the request. Defaults to the Channel Id set during the Initialise</td>
</tr>
<tr>
	<td>contentType</td>
	<td>Optional paramater to override the contentType that is sent as part of the request. Defaults to 'application/json'</td>
</tr>
</table>

# Reading data from the Appearition Platform

All calls to the Appearition Platform will yield a set JSON response. You can learn more about successful responses [here](/api-access/#the_http_200_ok_response_schema). 

When the *ArTarget/List* succeeds, all of your published AR records will be available under the *data* field of the reponse. Below is the code to load and process the data returned:

``` javascript
loadArTargets(data.ArTargets);
...
function loadArTargets(arTargets) {
    var htmlSnip = "<table class='table'><tr><th>Name</th><th>Asset Id (AR Target Key)</th><th>Target Images</th><th>Media</th></tr>";
    for (var i = 0; i < arTargets.length; i++) {
        htmlSnip += showArTarget(arTargets[i]);
    }
    htmlSnip += "</table>";
    $('#arExperiences').html(htmlSnip);

    loadTargetImages(arTargets);
}

```

# Handling errors

If something goes wrong with the request, there is a set format for errors. You can learn more about error handling [here](/api-access/#the_http_200_ok_response_schema).

For now, you can add this code which will handle any errors returned from the call to the platform:

```javascript
    function handleResponseErrors(error, xhr) {

        var msg = "<span class='error'>";

        if (error != null) {
            if(Array.isArray(error)) {
                error.foreach(function (e) {
                    msg += e + "; ";
                });
            }
            else{
                msg += error;
            }
        }

        console.log(xhr);
        if (xhr != null) {
            msg = msg + "Status Code: " + xhr.status 
            if(xhr.responseText)
            {
                msg += ", ResponseText: " + xhr.responseText + "; ";                
            }
        }

        msg += "</span>"

        PrintMessage(msg);
    }

    function PrintMessage(msg) {
        $('#messages').append("<br/>");
        $('#messages').append(msg);
    }
```

# Live Demo

<a target="_blank" href="http://docs.appearition.com/tutorials/developer/web/ar-experiences/samples/listArRecords.html">Click here</a> to see a live demo of this sample.