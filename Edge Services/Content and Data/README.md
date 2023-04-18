# Introduction

 <p>
    This sample project will show you how to consume the <em>Content Edge Service</em> from an Edge Machine. In this sample, you will be retrieving
    existing AR records from both the central Appearition Platform and the Edge Machine and see the load duration of each.
    <br/><br/>
    A few points about services on an edge machine:
    <ol>
        <li><em>Edge Services</em> are deployed on an <em>Edge Machine</em>. An <em>Edge Service</em> represents a specific type of workload that your client application needs.
            For example, <em>Content</em> is a <em>service</em> that exposes RESTFUL api endpoints for retrieving content and data for a particular AR record.
            Appearition has pre-created a number of <em>Edge Services</em> for you to use such as <em>Content</em>, <em>IOT streaming</em> and some AI. 
            However, if your application requires any custom types of workloads, you can deploy and manage those on your Edge Machines <a href="http://docs.appearition.com/tutorials/developer/edge/services" target="_blank">(learn more)</a></li>
        </li>
        <li>Edge Machines must already be registered, pre-configured, launched and ready to serve for your tenant in your Appearition Platform account <a href="http://docs.appearition.com/tutorials/developer/edge/setup" target="_blank">(learn more)</a></li>
        <li>To access an Edge Machine, you first need to make a call to the <strong><em>Broker</em></strong>. Its function is to identify 
        the closest edge machine for your location, establish the connection to all of the services hosted on that Edge Machine and return the connection details <a href="http://docs.appearition.com/tutorials/developer/edge/broker" target="_blank">(learn more)</a></li>
        </li>
        <li>AR records must be <em>published</em> and synced to the Edge Machine. You will need to do this via the Appearition Platform management console <a href="http://docs.appearition.com/tutorials/developer/edge/publishing" target="_blank">(learn more)</a></li>
        </li>
        <li><em>Search/List AR records</em> is not available as a function on an Edge Service. In this demo, all available AR records in your tenant/channel are first loaded form
            the central Appearition Platform. Once you select an AR record, the ID and KEY (aka assetId) can be used to retrieve content/data from the Edge Machine.
        </li>
    </ol>        
</p>

# Getting Started

1. Clone the project
2. Open 'workingWithEdge.html' file and enter the following parameters (lines 102-107):
    - **apiUrl**: Found on the API Access screen of your Appearition platform account
    - **apiToken**: The API token you created as part of registering the application.
    - **myChannelId**: The channel id (aka ProjectId)
    - **brokerUrl**: Found on the AnywhereEdgeCompute management screen of your Appearition platform account
    - **edgeMachineType**: You must define this in the AnywhereEdgeCompute management console of your Appearition platform account
    - **tenantKey**: Found on the API Access screen of your Appearition platform account

3. Run a local server and open the 'workingWithEdge.html' file in your browser. 

# Troubleshooting

1. Make sure you have registered an application on your Appearition platform account
2. Make sure you generate an API Token for your registered application
3. Assign the following roles to the registered application:
    - ArViewerAll
    - InternalContentLibraryViewerAll
    - TenantContentLibraryViewerAll
4. Assign your channel to the registered application.
5. Launch your own Edge Machine and deploy the Appearition Agent
6. Register and configure your edge machine via the AnywhereEdgeCompute management console of your Appearition platform account
