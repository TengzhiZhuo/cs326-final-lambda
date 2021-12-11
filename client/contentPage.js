'use strict';

let curPost = '';
let curUser = '';

window.onload = async function (){
    const response1 = await fetch('/getPost');
    const response2 = await fetch('/getComment');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postArr = await response1.json();
    const commentArr = await response2.json();
    if(urlParams.get('id') !== null){
      location.href='mainPage.html?user=' + ((postArr[postArr.length - 1]).username);
    }
    curPost = urlParams.get('post'); 
    curUser = urlParams.get('user'); 
    document.getElementById('contentUser').innerHTML = (postArr[postArr.length - curPost]).username;
    document.getElementById('contentTitle').innerHTML = (postArr[postArr.length - curPost]).title;
    document.getElementById('contentContext').innerHTML = (postArr[postArr.length - curPost]).content;
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