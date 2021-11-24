'use strict';

import {curUser} from './LogInPage.js';

document.getElementById('userpagesubmit').addEventListener('click', async () => {
    const graduation = document.getElementById("graduation").value;
    const major = document.getElementById("major").value;
    const minor = document.getElementById("minor").value;
    const interest = document.getElementById("interest").value;
    const response = await fetch("/profilesubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username : curUser, graduation : graduation, major : major, minor : minor, interest : interest})
      });
});

//window.onload = async function (){
  //const response1 = await fetch('/getProfile');
  //const postArr = await response1.json();
  //document.getElementById("graduation").value = JSON.stringify((postArr[postArr.length - 1]).title);
  //document.getElementById("graduation").value = JSON.stringify((postArr[postArr.length - 1]).content);
  //document.getElementById("graduation").value = JSON.stringify((postArr[postArr.length - 2]).title);
  //document.getElementById("graduation").value = 
//}