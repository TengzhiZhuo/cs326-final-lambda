'use strict';

let curPost = '';
let curUser = '';

window.onload = async function (){
    const response1 = await fetch('/getPost');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postArr = await response1.json();
    if(urlParams.get('id') !== null){
      location.href='mainPage.html?user=' + ((postArr[postArr.length - 1]).username);
    }
    curPost = urlParams.get('post'); 
    curUser = urlParams.get('user'); 
    document.getElementById('contentUser').innerHTML = (postArr[postArr.length - curPost]).username;
    document.getElementById('contentTitle').innerHTML = (postArr[postArr.length - curPost]).title;
    document.getElementById('contentContext').innerHTML = (postArr[postArr.length - curPost]).content;
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