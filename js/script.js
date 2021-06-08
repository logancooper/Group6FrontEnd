"use strict";
document.addEventListener("DOMContentLoaded", function (){
    //Fetch the past launches
    FetchPastLaunches();
})

//template for fetch command
function FetchTemplate()
{
    fetch()
        .then(function (response){
            return response.json();
        }) 
        .then(function (data){
            return data;
        })
        .catch(function (error){
            console.error("ERROR: ", error);
            return error;
        })
}

//Function to fetch past launch data from the API
function FetchPastLaunches()
{
    fetch('https://api.spacexdata.com/v4/launches/past')
        .then(function (response){
            return response.json();
        }) 
        .then(function (data){
            FetchPastLaunchesCallback(data);
            return data;
        })
        .catch(function (error){
            console.error("ERROR: ", error);
            return error;
        })
}

function FetchPastLaunchesCallback(data)
{
    console.log(data);
    for (var i = 0; i < data.length; i++)
    {
        BuildPastLaunchElement(data[i]);
    }
}

function BuildPastLaunchElement(launchInfo)
{
    //Grab the root element on the page & create a new div for our information
    const root = document.querySelector("#root");
    const newLaunch = document.createElement("div");

    //process the info from launchInfo provided
    const missionName = launchInfo.name;
    const flightNumber = launchInfo.flight_number;
    const launchSuccess = launchInfo.success;
    const launchDetails = launchInfo.details;
    const launchDateUTC = launchInfo.date_utc;
    const articleLink = launchInfo.links.article;
    const launchPatchSmall = launchInfo.links.patch.small;
    const launchPatchLarge = launchInfo.links.patch.large;
    const imagesSmall = launchInfo.links.flickr.small;
    const imagesOriginal = launchInfo.links.flickr.original;
    const redditLinks = launchInfo.links.reddit;
    const pressKit = launchInfo.links.presskit;
    const webCastLink = launchInfo.links.webcast
    const wikipediaLink = launchInfo.links.wikipedia;
    const redditCampaignLink = redditLinks.campaign;
    const redditLaunchLink = redditLinks.launch;
    const redditMediaLink = redditLinks.media;
    const redditRecoveryLink = redditLinks.recovery;

    //create paragraph elements for each piece of information to display
    const missionNameElement = document.createElement("p");
    const flightNumberElement = document.createElement("p");
    const launchSuccessElement = document.createElement("p");
    const launchDetailsElement = document.createElement("p");
    const launchDateUTCElement = document.createElement("p");
    const articleLinkElement = document.createElement("p");
    const launchPatchSmallElement = document.createElement("p");
    const launchPatchLargeElement = document.createElement("p");
    const imagesSmallElement = document.createElement("p");
    const imagesOriginalElement = document.createElement("p");
    const redditLinksElement = document.createElement("p");
    const pressKitElement = document.createElement("p");
    const webCastLinkElement = document.createElement("p");
    const wikipediaLinkElement = document.createElement("p");

    //Set the innertext of each paragraph element to display the data
    missionNameElement.innerText = "Mission Name: " + missionName;
    flightNumberElement.innerText = "Flight Number: " + flightNumber;
    launchSuccessElement.innerText = "Launch Successful: " + launchSuccess;
    launchDetailsElement.innerText = "Launch Details: " + launchDetails;
    launchDateUTCElement.innerText = "Launch Date: " + launchDateUTC;
    articleLinkElement.innerText = "Article Link: " + articleLink;
    launchPatchSmallElement.innerText = "Launch Patch (Small): " + launchPatchSmall;
    launchPatchLargeElement.innerText = "Launch Patch (Large): " + launchPatchLarge;
    imagesSmallElement.innerText = "Images (Small): " + imagesSmall;
    imagesOriginalElement.innerText = "Images (Original): " + imagesOriginal;
    redditLinksElement.innerText = "Reddit Campaign Link: " + redditCampaignLink + "\n" + "Reddit Launch Link: " + redditLaunchLink + "\n" + "Reddit Media Link: " + redditMediaLink + "\n" + "Reddit Recovery Link: " + redditRecoveryLink + "\n";
    pressKitElement.innerText = "Press Kit: " + pressKit;
    webCastLinkElement.innerText = "WebCast Link: " + webCastLink;
    wikipediaLinkElement.innerText = "Mission Wikipedia: " + wikipediaLink;

    //append each element to the new launch div
    newLaunch.append(missionNameElement);
    newLaunch.append(flightNumberElement);
    newLaunch.append(launchSuccessElement);
    newLaunch.append(launchDetailsElement);
    newLaunch.append(launchDateUTCElement);
    newLaunch.append(articleLinkElement);
    newLaunch.append(launchPatchSmallElement);
    newLaunch.append(launchPatchLargeElement);
    newLaunch.append(imagesSmallElement);
    newLaunch.append(imagesOriginalElement);
    newLaunch.append(redditLinksElement);
    newLaunch.append(pressKitElement);
    newLaunch.append(webCastLinkElement);
    newLaunch.append(wikipediaLinkElement);
    newLaunch.append(document.createElement("hr"))
    //append the new launch div to the root
    root.append(newLaunch);
}