'use strict';

let curUser = '';

document.getElementById('mainpagesubmit').addEventListener('click', async () => {
    const title = document.getElementById("mainpagetitle").value;
    const content = document.getElementById("mainpagecontent").value;
    location.href='mainPage.html?user=' + curUser;
    const response = await fetch("/postsubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username : curUser, title : title, content : content})
      });
});

document.getElementById('profilePage')

window.onload = async function (){
  const response1 = await fetch('/getPost');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postArr = await response1.json();
  if(urlParams.get('id') !== null){
    location.href='mainPage.html?user=' + ((postArr[postArr.length - 1]).username);
  }
  curUser = urlParams.get('user'); 
  document.getElementById('mainPageCurUser').innerHTML = curUser;
  document.getElementById('posttitle1').innerHTML = JSON.stringify((postArr[postArr.length - 1]).title);
  document.getElementById('postcontent1').innerHTML = JSON.stringify((postArr[postArr.length - 1]).content);
  document.getElementById('posttitle2').innerHTML = JSON.stringify((postArr[postArr.length - 2]).title);
  document.getElementById('postcontent2').innerHTML = JSON.stringify((postArr[postArr.length - 2]).content);
  document.getElementById('posttitle3').innerHTML = JSON.stringify((postArr[postArr.length - 3]).title);
  document.getElementById('postcontent3').innerHTML = JSON.stringify((postArr[postArr.length - 3]).content);
}