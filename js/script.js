"use strict";

const searchMissionButton = document.querySelector("#search-mission-button");
searchMissionButton.addEventListener("click", function (){
    //capture input
    const searchMissonDateStartInput = document.querySelector("#search-mission-date-start-input");
    const searchMissonDateEndInput = document.querySelector("#search-mission-date-end-input");
    const searchMissonNameInput = document.querySelector("#search-mission-name-input");

    //clear div
    ClearCardDiv();

    //fetch
    FetchPastLaunchesSearch(searchMissonNameInput.value, searchMissonDateStartInput.value, searchMissonDateEndInput.value);

    //process with inputs
})

document.addEventListener("DOMContentLoaded", function (){
    //Fetch the past launches
    ClearCardDiv();
    FetchPastLaunches();
    AddCardEventListeners()
})

function AddCardEventListeners()
{
    const cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
      card.addEventListener('click', function() {
        card.classList.toggle('focused');
      })
    })
}

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
    //build launch elements for the last 10 launches retrived
    for (var i = data.length - 1; i > data.length - 11; i--)
    {
        BuildLaunchElement(data[i]);
    }
}

function FetchPastLaunchesSearch(searchNameInput, startDateInput, endDateInput)
{
    fetch('https://api.spacexdata.com/v4/launches/past')
        .then(function (response){
            return response.json();
        }) 
        .then(function (data){
            FetchPastLaunchesSearchCallback(data,searchNameInput, startDateInput, endDateInput);
            return data;
        })
        .catch(function (error){
            console.error("ERROR: ", error);
            return error;
        })
}

function FetchPastLaunchesSearchCallback(data, searchNameInput, startDateInput, endDateInput)
{
    console.log("Search Name Input: " + searchNameInput);
    console.log("Start Date Input:" + startDateInput);
    console.log("End Date Input: " + endDateInput);
    console.log("\n");
    
    //for all of the launches returned
    for (var i = 0; i < data.length; i++)
    {
        const launchDate = new Date(data[i].date_utc);
        const myLaunchName = data[i].name;
        let nameMatch = false;
        let startDateMatch = false;
        let endDateMatch = false;
        
        //if the launch name field is not empty
        if(searchNameInput != "")
        {
            if(myLaunchName.includes(searchNameInput))
            {
                nameMatch = true;
            }
            else
            {
                nameMatch = false;
            }
        }
        else
        {
            //if the field is empty, set the match variable to true to ignore this field
            nameMatch = true;
        }

        //if the startDate field is not empty
        if(startDateInput != "")
        {
            const startDateInputObj = new Date(startDateInput);
            const startDate = Date.parse(startDateInputObj);
            //if the launch date is greater than the start date
            if(Date.parse(launchDate) >= startDate)
            {
                //flag it as a match
                startDateMatch = true;
            }
            else
            {
                //flag it as not a match
                startDateMatch = false;
            }
        }
        else
        {
            //if the field is empty, set the match variable to true to ignore this field
            startDateMatch = true;
        }
        //if the endDate field is not empty
        if(endDateInput != "")
        {
            const endDateInputObj = new Date(endDateInput);
            const parsedEndDateInput = Date.parse(endDateInputObj);
            //if the launch date is less than the endDate
            if(Date.parse(launchDate) <= parsedEndDateInput)
            {
                //flag it as a match
                endDateMatch = true;
            }
            else
            {

                //flag it as not a match
                endDateMatch = false;
            }
        }
        else
        {
            //if the field is empty, set the match variable to true to ignore this field
            endDateMatch = true;
        }

        if(nameMatch && startDateMatch && endDateMatch === true)
        {
            console.log("adding card");
            BuildLaunchElement(data[i]);
        }

    }
}

function BuildLaunchElement(launchInfo)
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


    //NEW Create main elements


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

    //console.log(String(launchSuccess));
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

function ClearCardDiv()
{
    const div = document.getElementById("card-container");
    while(div.firstChild)
    {
        div.removeChild(div.firstChild);
    }
}