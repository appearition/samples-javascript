# Introduction

This sample is an introduction to data sources that can be added as media *AR* records.
To create a record please refer to the [Create](../Create/) sample.

# You will need an account on the Appearition Platform

Making API Requests to the Appearition Platform requires an application to have been registered and an API Token to have been created for that application.

> ***Registering applications and creating API Tokens***
>
> For more information about registering an application and creating an API Token, please [click here](http://docs.appearition.com/sdk/api-access/#application_registration)

# Getting Started

1. Clone the project
2. Open 'workingWithData.html' file and enter the following parameters (lines 138-140):

- **apiUrl**: Found on the API Access screen of your Appearition platform account
- **apiToken**: The API token you created as part of registering the application.
- **myChannelId**: The channel id (aka ProjectId)

3. Run a local server and open the `workingWithData.html` file in your browser. 

# Troubleshooting

1. Make sure you have registered an application on your Appearition platform account
2. Make sure you generate an API Token for your registered application
3. Assign the following roles to the registered application:
    - ArCreator
    - ArEditorAll
4. Assign your channel to the registered application.

# Media and Media Types

An AR record can hold many `media`. Media represents any kind of content that you want to present to users as part of their AR experience. Examples include 3D models, images and videos, each being stored as one `media` record on the AR record. For each type of content being served, the `mediaType` property is set accordingly. 

`mediaType` is an abstracted property that gives you the ability to  control how you present and process different types of content on your  front end applications. You will find existing `mediaTypes` already defined such as `model`, `image`, `video`. However if your application logic or your target front end device demands a specific type of content, then you can define your own `mediaType` and use it when adding `media` to your AR records. 

# Data and Data Providers

Data is another type of `media` which is stored against an AR record. A `Data Provider` is the type of `data store` you need to retrieve the data from. Examples include `MS SQL Server` or `URI`. 

The name of the `Data Provider` is set as the `mediaType`. On the Appearition Platform, a specific module exists to handle query requests for each `Data Provider`. 

> ***Connecting to different data providers***
>
> Other data providers can be activated and/or added to the Appearition Platform as required. Please <a href="mailto:support@appearition.com?subject=More on different data providers" target="_blank">contact us</a> for further assistance

A `media` record is created to run a specific query against the `Data Provider`. Each `Data Provider` will support specific query syntax to fetch data. 

For example, the `UriDataReader` can retrieve data from a pre-defined URL. <a href="http://worldtimeapi.org/api/ip">http://worldtimeapi.org/api/ip</a> is an open API for retrieving time information globally. To use this API on your AR record, you would create a new `media` and set the `mediaType` to `UriDataReader`. Then in the `text` field you would set the above URL

```js
var requestData = {
    mediaType: 'UriDataReader',
    text: 'http://worldtimeapi.org/api/ip',
    isDataQuery: true
};

Appearition.ArTargetImageAndMedia.CreateMedia(
    selectedArTarget.arTargetId,
    JSON.stringify(requestData),
    {
        beforeSend: function (request) {
            showScreenBlocker("Adding data media...")
        },
        complete: function(){
            hideScreenBlocker();
        },
        success: function (data) {
            printMessage('Data media added.');
            arMediaId = data.arMediaId
            reloadArTarget(selectedArTarget.arTargetId);
        },
        error: function (errors) {
            handleResponseErrors(errors)
        }
    });
```

There is an API endpoint you can call to give you the list of `Data Providers` available on your account. You can use this to present a list on screen when editing a media record

```js
Appearition.ArTargetImageAndMedia.AvailableDataMediaTypes(
    {
        success: function (data) {

            availableDataMediaTypes = data;

            lstDataMediaType.append("<option value=''>Choose Data Source...</option>");
            data.foreach(mediaType => {
                lstDataMediaType.append("<option value='" + mediaType.Name + "'>" + mediaType.Name + "</option>");
            });

        },
        error: function (errors) {
            handleResponseErrors(errors);
        }
    });
```

# Data Queries / Fetching Data

Once the data `media` is created, you invoke an API endpoint on the AR module to get the data results.

```js
var dataRequest = {
    arTargetKey: selectedArTarget.assetId,
    arMediaId: selectedMedia.arMediaId
};

Appearition.ArTargetImageAndMedia.DataByKey(
    JSON.stringify(dataRequest),
    {
        beforeSend: function (request) {
            pnlTestQueryOutput.html("fetching...");
            printMessage('fetching data...');
        },
        complete: function(){
            printMessage('fetching data complete.');
        },
        success: function (data) {

            if (data == null || data.length == 0) {
                pnlTestQueryOutput.html("no data found")
                return;
            }

            pnlTestQueryOutput.html(data);

        },
        error: function (errors) {
            pnlTestQueryOutput.html(errors);
            handleResponseErrors(errors);
        }
    }
);        

```

# Data Transformations

If you want to manipulate the raw result that comes back from your data query, then `data transformation` is the mechanism. 

When creating the data `media`, you can define the type of data tranformation to apply along with the template to use when transforming.

For example, the <a href="http://worldtimeapi.org/api/ip">http://worldtimeapi.org/api/ip</a> URL returns back a JSON of results 

```json
{
	"abbreviation": "AEDT",
	"client_ip": "xxx.xxx.xxx.xxx",
	"datetime": "2023-03-22T14:54:43.178867+11:00",
	"day_of_week": 3,
	"day_of_year": 81,
	"dst": true,
	"dst_from": "2022-10-01T16:00:00+00:00",
	"dst_offset": 3600,
	"dst_until": "2023-04-01T16:00:00+00:00",
	"raw_offset": 36000,
	"timezone": "Australia/Melbourne",
	"unixtime": 1679457283,
	"utc_datetime": "2023-03-22T03:54:43.178867+00:00",
	"utc_offset": "+11:00",
	"week_number": 12
}
```

If we want to only return the `datetime` field, then on the `media` record you configure the `dataTransform.ProviderName` to be `JsonDataTransform` and set the `TemplateText` to `datetime`

```js
var requestData = {
    arMediaId: selectedMedia.arMediaId,
    mediaType: 'UriDataReader',
    text: 'http://worldtimeapi.org/api/ip',
    isDataQuery: true,
    dataTransform: {
        ProviderName: 'JsonDataTransform',
        TemplateText: 'datetime'
    }
};

Appearition.ArTargetImageAndMedia.UpdateMediaSettings(
    selectedArTarget.arTargetId,
    selectedMedia.arMediaId,
    JSON.stringify(requestData),
    {
        beforeSend: function(){
            printMessage("Saving media...")
            showScreenBlocker("Saving media...")
        },
        complete: function(){
            hideScreenBlocker();
        },
        success: function(data) {
            printMessage("Media saved")
        },
        error: function(errors) {
            handleResponseErrors(errors)
        }
    }); 
```

There is an API endpoint you can call to give you the list of `Data Transform Providers` available on your account. You can use this to present a list on screen when editing a media record

```js
Appearition.ArTargetImageAndMedia.AvailableDataTransformProviders(
    {
        success: function (data) {

            availableDataTransformProviders = data;

            lstDataTransformProvider.append("<option value=''>Choose Data Transform...</option>");
            data.foreach(transformProvider => {
                lstDataTransformProvider.append("<option value='" + transformProvider.name + "'>" + transformProvider.description + "</option>");
            });

        },
        error: function (errors) {
            handleResponseErrors(errors)
        }
    });   
```