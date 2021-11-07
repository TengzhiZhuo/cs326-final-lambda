'use strict';

async function getmainPageData() {
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const url = "http://localhost:8080/mainPage?id=1";
    const response = await(fetch(url));
    if (response.status !== 404) {
        const responseJson = await response.json();
        if ("title" in responseJson) {
            title.value = responseJson["title"];
        }
        if ("content" in responseJson) {
            content.value = responseJson["content"];
        }
    }
    else {
        window.alert("An error has occurred!");
    }
}

function initialize() {
    window.onload = getmainPageData();
    document.getElementById("mainpagesubmit").addEventListener('click', ()=>{window.location.href="http://localhost:8080"});
}

window.onload = initialize();