'use strict';

let curUser = '';

document.getElementById('userpagesubmit').addEventListener('click', async () => {
    const graduation = document.getElementById("graduation").value;
    const major = document.getElementById("major").value;
    const minor = document.getElementById("minor").value;
    const interest = document.getElementById("interest").value;
    // location.href='userPage.html?user=' + curUser;
    const response = await fetch("/profilesubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username : curUser, graduation : graduation, major : major, minor : minor, interest : interest})
      });
      location.href='userPage.html?user=' + curUser;
});

document.getElementById('backhomePage').addEventListener('click', () => {
  location.href='mainPage.html?user=' + curUser;
})

document.getElementById('profilePage').addEventListener('click', () => {
  location.href='userPage.html?user=' + curUser;
})

//
window.onload = async function (){
  const response1 = await fetch('/getProfile');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const profileArr = await response1.json();
  curUser = urlParams.get('user'); 
  document.getElementById('userpageName').innerHTML = curUser;
  let graduation = document.getElementById("graduation");
  let major = document.getElementById("major");
  let minor = document.getElementById("minor");
  let interest = document.getElementById("interest");
  for (let i = 0; i < profileArr.length; i++) {
    if(profileArr[i].username === curUser) {
      graduation.value = profileArr[i].graduation;
      major.value = profileArr[i].major;
      minor.value = profileArr[i].minor;
      interest.value = profileArr[i].interest;
      break;
    }
  }
}