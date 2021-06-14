"use strict";
const searchMissonDateStartInput = document.querySelector("#search-mission-date-start-input");
const searchMissonDateEndInput = document.querySelector("#search-mission-date-end-input");
const searchMissonNameInput = document.querySelector("#search-mission-name-input");
//const searchMissionLaunchSuccessRadio = document.getElementsByName("mission-result-radio");
const searchMissionLaunchResultDropdown = document.querySelector("#launch-result-dropdown");
const searchMissionButton = document.querySelector("#search-mission-button");


searchMissionButton.addEventListener("click", function() {
    //capture input

    //clear div
    ClearCardDiv();

    //fetch
    FetchLaunchesSearch(searchMissonNameInput.value, searchMissonDateStartInput.value, searchMissonDateEndInput.value, searchMissionLaunchResultDropdown.value);
    
})

const resetSearchButton = document.querySelector("#reset-button");
resetSearchButton.addEventListener("click", function(){
    ClearInput(searchMissonDateStartInput);
    ClearInput(searchMissonDateEndInput);
    ClearInput(searchMissonNameInput);
})

document.addEventListener("DOMContentLoaded", function (){
    //Fetch the past launches
    ClearCardDiv();
    FetchLaunches();
})

//template for fetch command
function FetchTemplate() {
    fetch()
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data;
        })
        .catch(function(error) {
            console.error("ERROR: ", error);
            return error;
        })
}

//Function to fetch past launch data from the API

function FetchLaunches()
{
    fetch('https://api.spacexdata.com/v4/launches')
        .then(function (response){
            return response.json();
        }) 
        .then(function (data){
            FetchLaunchesCallback(data);
            return data;
        })
        .catch(function(error) {
            console.error("ERROR: ", error);
            return error;
        })
}


function FetchLaunchesCallback(data)
{
    console.log(data);
    //build launch elements for the last 10 launches retrived
    for (var i = data.length - 1; i > data.length - 11; i--) {
        BuildLaunchElement(data[i]);
    }
}

function FetchLaunchesSearch(searchNameInput, startDateInput, endDateInput, launchResult)
{
    fetch('https://api.spacexdata.com/v4/launches')
        .then(function (response){
            return response.json();
        }) 
        .then(function (data){
            FetchLaunchesSearchCallback(data,searchNameInput, startDateInput, endDateInput, launchResult);
            return data;
        })
        .catch(function(error) {
            console.error("ERROR: ", error);
            return error;
        })
}


function FetchLaunchesSearchCallback(data, searchNameInput, startDateInput, endDateInput, launchResult)
{
    console.log("Search Name Input: " + searchNameInput);
    console.log("Start Date Input:" + startDateInput);
    console.log("End Date Input: " + endDateInput);
    console.log("Launch Result Radio Input:" + launchResult);
    console.log("\n");

    //for all of the launches returned
    for (var i = 0; i < data.length; i++) {
        const launchDate = new Date(data[i].date_utc);
        const myLaunchName = data[i].name;
        let nameMatch = false;
        let startDateMatch = false;
        let endDateMatch = false;
        let resultMatch = false;
        
        //if the launch name field is not empty
        if (searchNameInput != "") {
            if (myLaunchName.includes(searchNameInput)) {
                nameMatch = true;
            } else {
                nameMatch = false;
            }
        } else {
            //if the field is empty, set the match variable to true to ignore this field
            nameMatch = true;
        }

        //if the startDate field is not empty
        if (startDateInput != "") {
            const startDateInputObj = new Date(startDateInput);
            const startDate = Date.parse(startDateInputObj);
            //if the launch date is greater than the start date
            if (Date.parse(launchDate) >= startDate) {
                //flag it as a match
                startDateMatch = true;
            } else {
                //flag it as not a match
                startDateMatch = false;
            }
        } else {
            //if the field is empty, set the match variable to true to ignore this field
            startDateMatch = true;
        }
        //if the endDate field is not empty
        if (endDateInput != "") {
            const endDateInputObj = new Date(endDateInput);
            const parsedEndDateInput = Date.parse(endDateInputObj);
            //if the launch date is less than the endDate
            if (Date.parse(launchDate) <= parsedEndDateInput) {
                //flag it as a match
                endDateMatch = true;
            } else {

                //flag it as not a match
                endDateMatch = false;
            }
        } else {
            //if the field is empty, set the match variable to true to ignore this field
            endDateMatch = true;
        }

        //if the launchResult field is not empty
        if(launchResult != "both")
        {
            //console.log("Launch Result Radio Input:" + launchResult);
            //console.log("Launch Result Data:" + data[i].success);
            if(launchResult === "success" && data[i].success === true)
            {
                //flag it as a match
                resultMatch = true;
            }
            else if(launchResult === "failure" && data[i].success === false)
            {
                //flag it as not a match
                resultMatch = true;
            }
        }
        else
        {
            //if the field is empty, set the match variable to true to ignore this field
            resultMatch = true;
        }
        console.log("Card Result Match:" + resultMatch);
        if(nameMatch && startDateMatch && endDateMatch && resultMatch === true)
        {
            console.log("adding card");
            BuildLaunchElement(data[i]);
        }

    }
}

function BuildLaunchElement(launchInfo) {
    //process the info from launchInfo provided
    const missionName = launchInfo.name;
    const flightNumber = launchInfo.flight_number;
    const launchSuccess = launchInfo.success;
    const launchDetails = launchInfo.details;
    const launchDateUTC = launchInfo.date_utc;
    const articleLink = launchInfo.links.article;
    const launchPatchSmall = launchInfo.links.patch.small;
    const redditLinks = launchInfo.links.reddit;
    const pressKit = launchInfo.links.presskit;
    const webCastLink = launchInfo.links.webcast
    const wikipediaLink = launchInfo.links.wikipedia;
    const redditCampaignLink = redditLinks.campaign;

    //NEW Create main elements
    const cardContainer = document.querySelector("#card-container");

    const newLaunchCard = document.createElement("div");
    newLaunchCard.className = "flip-card";
    newLaunchCard.setAttribute("style", "width: 18rem");

    const newLaunchCardInner = document.createElement("div");
    newLaunchCardInner.className = "flip-card-inner";

    const newLaunchCardFront = document.createElement("div");
    newLaunchCardFront.className = "flip-card-front";

    
    if(launchPatchSmall != null)
    {
        const cardFrontImageElement = document.createElement("img");
        cardFrontImageElement.setAttribute("src", launchPatchSmall);
        cardFrontImageElement.className = "card-img-top";
        newLaunchCardFront.append(cardFrontImageElement);
    }
    else
    {
        const cardFrontImageElement = document.createElement("img");
        cardFrontImageElement.setAttribute("src", "ELON.SPACEX.web_.jpg.jpeg");
        cardFrontImageElement.className = "card-img-top";
        newLaunchCardFront.append(cardFrontImageElement);
    }
    

    const cardFrontBody = document.createElement("div");
    cardFrontBody.className = "card-body";

    const cardFrontList = document.createElement("ul");
    cardFrontList.className = "list-group list-group-flush";

    const newLaunchCardBack = document.createElement("div");
    newLaunchCardBack.className = "flip-card-back";

    const cardBackBody = document.createElement("div");
    cardBackBody.className = "details";

    const missionDetailsHeader = document.createElement("h3");
    missionDetailsHeader.innerText = "Mission Details";
    cardBackBody.append(missionDetailsHeader);

    const cardBackList = document.createElement("ul");
    cardBackList.className = "card-back-list";

    //create children elements
    const missionNameElement = document.createElement("h5");
    missionNameElement.className = "card-title";
    const moreInfoElement = document.createElement("p");
    moreInfoElement.className = "card-text";
    const flightNumberElement = document.createElement("li");
    flightNumberElement.className = "list-group-item";
    const launchSuccessElement = document.createElement("li");
    launchSuccessElement.className = "list-group-item";
    const launchDateUTCElement = document.createElement("li");
    launchDateUTCElement.className = "list-group-item";
    
    const launchDetailsElement = document.createElement("p");
    launchDetailsElement.className = "card-text";
    
    
    const articleLinkListItem = document.createElement("li");
    const articleLinkElement = document.createElement("a");
    articleLinkElement.setAttribute("href", articleLink);
    articleLinkListItem.append(articleLinkElement)
    
    const redditLinkListItem = document.createElement("li");
    const redditLinksElement = document.createElement("a");
    redditLinksElement.setAttribute("href", redditCampaignLink);
    redditLinkListItem.append(redditLinksElement)

    const pressKitListItem = document.createElement("li");
    const pressKitElement = document.createElement("a");
    pressKitElement.setAttribute("href", pressKit);
    pressKitListItem.append(pressKitElement)

    const webCastLinkListItem = document.createElement("li");
    const webCastLinkElement = document.createElement("a");
    webCastLinkElement.setAttribute("href", webCastLink);
    webCastLinkListItem.append(webCastLinkElement)

    const wikipediaLinkListItem = document.createElement("li");
    const wikipediaLinkElement = document.createElement("a");
    wikipediaLinkElement.setAttribute("href", wikipediaLink);
    wikipediaLinkListItem.append(wikipediaLinkElement)

    //Set the innertext of each element to display the data
    missionNameElement.innerText = missionName;
    flightNumberElement.innerText = "Flight Number: " + flightNumber;

    //console.log(String(launchSuccess));
    if(launchSuccess === null)
    {
        launchSuccessElement.innerText = "Upcoming Launch";
        newLaunchCard.className = "flip-card neutral-card"
    }
    else if(String(launchSuccess) === "true")
    {

        launchSuccessElement.innerText = "Launch Success";
        newLaunchCard.className = "flip-card success-card"
    } else if (String(launchSuccess) === "false") {
        launchSuccessElement.innerText = "Launch Failure";
        newLaunchCard.className = "flip-card failure-card"
    }
    

    moreInfoElement.innerText = "Click for more info";
    launchDetailsElement.innerText = launchDetails;
    launchDateUTCElement.innerText = "Launch Date: " + launchDateUTC;
    articleLinkElement.innerText = "Article";
    redditLinksElement.innerText = "Reddit Campaign Link";
    pressKitElement.innerText = "Press Kit";
    webCastLinkElement.innerText = "WebCast Link";
    wikipediaLinkElement.innerText = "Mission Wikipedia";

    //append each element to the new launch div

    //card back
    cardBackBody.append(missionDetailsHeader);
    cardBackBody.append(launchDetailsElement);
    cardBackList.append(articleLinkListItem);
    cardBackList.append(redditLinkListItem);
    cardBackList.append(webCastLinkListItem);
    cardBackList.append(wikipediaLinkListItem);
    cardBackList.append(pressKitListItem);
    newLaunchCardBack.append(cardBackBody);
    newLaunchCardBack.append(cardBackList);
 

    //card front
    cardFrontBody.append(missionNameElement);
    cardFrontBody.append(moreInfoElement);
    cardFrontList.append(flightNumberElement);
    cardFrontList.append(launchSuccessElement);
    cardFrontList.append(launchDateUTCElement);
    newLaunchCardFront.append(cardFrontBody);
    newLaunchCardFront.append(cardFrontList);

    //card inner
    newLaunchCardInner.append(newLaunchCardFront);
    newLaunchCardInner.append(newLaunchCardBack);
    newLaunchCard.append(newLaunchCardInner);

    newLaunchCardInner.addEventListener("click", function() {
        newLaunchCardInner.classList.toggle("flip");
    })

    //card container
    cardContainer.append(newLaunchCard);

}

function ClearCardDiv() {
    const div = document.getElementById("card-container");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 100 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);

function ClearInput(input)
{
    
    if(input.type === "radio")
    {
        input.checked = false;
    }

    input.value = "";

}


