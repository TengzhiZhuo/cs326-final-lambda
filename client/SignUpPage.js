'use strict';

document.getElementById('signupSubmit').addEventListener('click', async () => {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const response = await fetch("/signupsubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username : username, password : password})
      });
      console.log("hi");
      const check = await response.json();
      console.log(check);
      if (check === true) {
        alert("Username Already Existed!");
      }
      else {
        location.href='index.html';
        alert("Sign Up Succed!");
      }
});
