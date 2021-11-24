'use strict';

async function getsignupPageData() {
    const user = document.getElementById("user");
    const password = document.getElementById("password");
    const url = "http://localhost:8080/signUpPage?id=1";
    const response = await(fetch(url));
    if (response.status !== 404) {
        const responseJson = await response.json();
        if ("user" in responseJson) {
            user.value = responseJson["user"];
        }
        if ("signupPassword" in responseJson) {
            password.value = responseJson["password"];
        }
    }
    else {
        window.alert("An error has occurred!");
    }
}

function initialize() {
    window.onload = getsignupPageData();
    document.getElementById("signuppagesubmit").addEventListener('click', ()=>{window.location.href="http://localhost:8080"});
}

window.onload = initialize();