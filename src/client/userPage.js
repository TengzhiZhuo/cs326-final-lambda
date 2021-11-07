'use strict';

async function getUserPageData() {
    const userName = document.getElementById("userName");
    const bio = document.getElementById("bio");
    const graduation = document.getElementById("graduation");
    const major = document.getElementById("major");
    const minor = document.getElementById("minor");
    const interest = document.getElementById("interest");
    const url = "http://localhost:8080/userPage?id=1";
    const response = await(fetch(url));
    if (response.status !== 404) {
        const responseJson = await response.json();
        if ("userName" in responseJson) {
            userName.innerHTML = responseJson["userName"];
        }
        if ("bio" in responseJson) {
            bio.innerHTML += responseJson["bio"];
        }
        if ("graduation" in responseJson) {
            graduation.value = responseJson["graduation"];
        }
        if ("major" in responseJson) {
            major.value = responseJson["major"];
        }
        if ("minor" in responseJson) {
            minor.value = responseJson["minor"];
        }
        if ("interest" in responseJson) {
            interest.value = responseJson["interest"];
        }
    }
    else {
        window.alert("An error has occurred!");
    }
}

// async function submitUserPageData() {
//     const graduation = document.getElementById("graduation");
//     const major = document.getElementById("major");
//     const minor = document.getElementById("minor");
//     const interest = document.getElementById("interest");
//     const url = "http://localhost:8080/userPage?id=1";
// }

function initialize() {
    window.onload = getUserPageData();
    document.getElementById("submit").addEventListener('click', ()=>{window.location.href="http://localhost:8080"});
}

window.onload = initialize();