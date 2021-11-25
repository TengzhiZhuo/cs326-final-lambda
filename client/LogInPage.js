'use strict';

export let curUser;

document.getElementById('loginSubmit').addEventListener('click', async () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const response = await fetch("/loginsubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({username : username, password : password})
      });
      const suc = await response.json();
      console.log(suc);
      if(suc){
          curUser = username;
          location.href='mainPage.html';
      } else {
          alert("Wrong Username or Password");
      }
});

