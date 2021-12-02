'use strict';

document.getElementById('mainpagesubmit').addEventListener('click', async () => {
    const title = document.getElementById("mainpagetitle").value;
    const content = document.getElementById("mainpagecontent").value;
    const response = await fetch("/postsubmit", {
        method: "post",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title : title, content : content})
      });
});

window.onload = async function (){
  const response1 = await fetch('/getPost');
  console.log(window.curUser);
  const postArr = await response1.json();
  document.getElementById('posttitle1').innerHTML = JSON.stringify((postArr[postArr.length - 1]).title);
  document.getElementById('postcontent1').innerHTML = JSON.stringify((postArr[postArr.length - 1]).content);
  document.getElementById('posttitle2').innerHTML = JSON.stringify((postArr[postArr.length - 2]).title);
  document.getElementById('postcontent2').innerHTML = JSON.stringify((postArr[postArr.length - 2]).content);
  document.getElementById('posttitle3').innerHTML = JSON.stringify((postArr[postArr.length - 3]).title);
  document.getElementById('postcontent3').innerHTML = JSON.stringify((postArr[postArr.length - 3]).content);
}