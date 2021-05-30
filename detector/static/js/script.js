"use strict";
let sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
let upload = document.querySelector(".upload");
let uploadBtn = document.querySelector(".upload__button");
let fileSelector = document.createElement('input');
fileSelector.setAttribute('type', 'file');

fileSelector.addEventListener("input", async () => {
    console.log(fileSelector.value);
    let files = fileSelector.files;
    let formData = new FormData();
    formData.append('image', files[0], files[0].name);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 1){
            upload.classList.add("uploading");
        }
        if (xhr.readyState == 2) {
            if (xhr.status === 200){
                upload.classList.remove('uploading');
                upload.classList.add('uploaded');
                upload.classList.add('animate__animated');
                upload.classList.add('animate__bounceOutUp');
                upload.classList.add('animate__delay-2s');
            } else {
                upload.classList.remove('uploading')
                upload.classList.add('uploaderror');
                document.getElementById('hint').innerHTML = "Error";
                upload.classList.add('animate__animated');
                upload.classList.add('animate__bounce');
                upload.classList.add('animate__delay-2s');
                upload.addEventListener('animationend', () => {
                    document.getElementById('hint').innerHTML = "Uploading";
                    upload.classList.remove('uploaderror');
                })
            }
        }
        if (xhr.readyState == 4) {
            let response = JSON.parse(xhr.response);
            let url = response.url;
            let count = response.count;
            let resultsElement = document.getElementById('results').style.display = 'flex';
            let imageElement = document.getElementById('output-image').setAttribute('src', url);
            let countElement = document.getElementById('count').innerHTML = `${count} empty spaces detected`
        }
    };
    xhr.open('POST', 'http://localhost:8000/detector/', true);
    xhr.send(formData);
});


uploadBtn.addEventListener("click", async () => {
    fileSelector.click();
    // upload.classList.add("uploading");
    // await sleep(3000);
    // upload.classList.add("uploaded");
    // await sleep(2000);
    // upload.classList.remove("uploading");
    // upload.classList.add("uploaded-after");
    // await sleep(1000);
    // upload.className = "upload";
});
