'use strict';

let curPost = '';
let curUser = '';

window.onload = async function (){
    const response1 = await fetch('/getPost');
    const response2 = await fetch('/getComment');
    const response3 = await fetch('/getProfile');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postArr = await response1.json();
    const commentArr = await response2.json();
    const profileArr = await response3.json();
    curPost = urlParams.get('post'); 
    curUser = urlParams.get('user'); 
    document.getElementById('contentUser').innerHTML = (postArr[postArr.length - curPost]).username;
    document.getElementById('contentTitle').innerHTML = (postArr[postArr.length - curPost]).title;
    document.getElementById('contentContext').innerHTML = (postArr[postArr.length - curPost]).content;
    for(let j = 0; j < commentArr.length; j++) {
      if(profileArr[j].username === document.getElementById('contentUser').innerHTML) {
        if (profileArr[j].graduation !== '') {
          document.getElementById('contentProfile').innerHTML += "Graduation: " + profileArr[j].graduation + " ";
        }
        if (profileArr[j].major !== '') {
          document.getElementById('contentProfile').innerHTML += "Major: " + profileArr[j].major + " ";
        }
        if (profileArr[j].minor !== '') {
          document.getElementById('contentProfile').innerHTML += "Minor: " + profileArr[j].minor + " ";
        }
        if (profileArr[j].interest !== '') {
          document.getElementById('contentProfile').innerHTML += "Interest: " + profileArr[j].interest + " ";
        }
      }
    } 
    for(let i = 0; i < commentArr.length; i++) {
      if(commentArr[i].post === document.getElementById('contentTitle').innerHTML) {
        document.getElementById('comments').innerHTML += "<div class='bold'><img src='img/profilePicDefault.jpg' class='rounded-circle content-smallHead' alt=''>"+ commentArr[i].username +"</div><p class='card-text content-margeTop' id='comments'>"+ commentArr[i].content +"</p>";
      }
    } 
  }

  document.getElementById('postComment').addEventListener('click', async () => {
    const post = document.getElementById("contentTitle").innerHTML;
    const content = document.getElementById("userComment").value;
    location.href = 'contentPage.html?post=' + curPost +'&user=' + curUser;
    const response = await fetch("/commentsubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username : curUser, post : post, content : content})
      });
});

  document.getElementById('profilePage').addEventListener('click', () => {
    location.href='userPage.html?user=' + curUser;
  })

  document.getElementById('backhomePage').addEventListener('click', () => {
    location.href='mainPage.html?user=' + curUser;
  })