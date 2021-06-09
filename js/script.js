'use strict'


const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
  card.addEventListener('click', function() {
    card.classList.toggle('focused');
  })
})


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

    //Create the main elements
    const container = document.querySelector("#card-container");
    const newLaunch = document.createElement("class");
    newLaunch.className = "card"
    newLaunch.setAttribute("style", "width: 18rem");
    const newLaunchCardBody = document.createElement("div");
    newLaunchCardBody.className = "card-body";
    const testImageElement = document.createElement("img");
    testImageElement.setAttribute("src", launchPatchSmall);
    testImageElement.className = "card-img-top";
    const newLaunchList = document.createElement("ul");
    newLaunchList.className = "list-group list-group-flush";


    //create children elements
    const missionNameElement = document.createElement("h5");
    missionNameElement.className = "card-title";
    const flightNumberElement = document.createElement("li");
    flightNumberElement.className = "list-group-item";
    const launchSuccessElement = document.createElement("li");
    launchSuccessElement.className = "list-group-item";
    const launchDetailsElement = document.createElement("p");
    launchDetailsElement.className = "card-text";
    const launchDateUTCElement = document.createElement("li");
    launchDateUTCElement.className = "list-group-item";
    

    const launchPatchSmallElement = document.createElement("p");
    const launchPatchLargeElement = document.createElement("p");
    const imagesSmallElement = document.createElement("p");
    const imagesOriginalElement = document.createElement("p");

    const articleLinkElement = document.createElement("p");
    const redditLinksElement = document.createElement("p");
    const pressKitElement = document.createElement("p");
    const webCastLinkElement = document.createElement("p");
    const wikipediaLinkElement = document.createElement("p");

    //Set the innertext of each element to display the data
    missionNameElement.innerText = missionName;
    flightNumberElement.innerText = "Flight Number: " + flightNumber;

    console.log(String(launchSuccess));
    if(String(launchSuccess) === "true")
    {
        launchSuccessElement.innerText = "Launch Success";
        newLaunch.className = "card success-card"
    }
    else if(String(launchSuccess) === "false")
    {
        launchSuccessElement.innerText = "Launch Failure";
        newLaunch.className = "card failure-card"
    }
    
    launchDetailsElement.innerText = "Click for flight details";
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
    newLaunchCardBody.append(missionNameElement);
    newLaunchCardBody.append(launchDetailsElement);
    newLaunchList.append(flightNumberElement);
    newLaunchList.append(launchSuccessElement);
    newLaunchList.append(launchDateUTCElement);
    newLaunch.append(testImageElement);
    newLaunch.append(newLaunchCardBody);
    newLaunch.append(newLaunchList);
    //newLaunch.append(articleLinkElement);
    //newLaunch.append(launchPatchSmallElement);
    //newLaunch.append(launchPatchLargeElement);
    //newLaunch.append(imagesSmallElement);
    //newLaunch.append(imagesOriginalElement);
    //newLaunch.append(redditLinksElement);
    //newLaunch.append(pressKitElement);
    //newLaunch.append(webCastLinkElement);
    //newLaunch.append(wikipediaLinkElement);
    //newLaunch.append(document.createElement("hr"))
    //append the new launch div to the root
    container.append(newLaunch);
}