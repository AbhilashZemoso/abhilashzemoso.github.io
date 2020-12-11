let formName;
let formEmail;

let contactForm;

function indexInit() {
    formName = document.querySelector('#form-name');
    formEmail = document.querySelector('#form-email');

    contactForm = document.querySelector('#contact-form');
    addValidations();
    setUpGallery();
}

//contact validatitions

function addValidations() {
    contactForm.onsubmit = function (e) {
        const name = formName.value;
        const email = formEmail.value;
        if (name !== "") {
            processValidName();
        } else {
            processEmptyName();
        }
        processValidEmail();
        if (email === "") {
            processEmptyEmail();
        } else if (!email.match("[a-zA-Z.]+(@gmail.com)$")) {
            processInValidEmail();
        }
        e.preventDefault();
    }
}


function processEmptyName() {
    formName.classList.add("invalid");
    const message = document.querySelector('#name-error');
    message.style.display = "block";
}

function processValidName() {
    formName.classList.remove("invalid");
    const message = document.querySelector('#name-error');
    message.style.display = "none";
}


function processEmptyEmail() {
    formEmail.classList.add("invalid");
    const message = document.querySelector('#empty-email');
    message.style.display = "block";
}

function processInValidEmail() {
    formEmail.classList.add("invalid");
    const message = document.querySelector('#email-error');
    message.style.display = "block";
}

function processValidEmail() {
    formEmail.classList.remove("invalid");
    const invalidError = document.querySelector('#email-error');
    invalidError.style.display = "none";
    const requiredError = document.querySelector('#empty-email');
    requiredError.style.display = "none";
}

//Load Gallery Page

function setUpGallery() {
    const fileUrl = '/resources/gallery.json';
    const out = fetch(fileUrl)
        .then(function (rawData) {
            return rawData.text()
        })
        .then(function (jsonData) {
            generatePhotos(JSON.parse(jsonData));
        })
}

function generatePhotos(photos) {
    const parentDiv = document.querySelector('.photos');
    photos.forEach(function (photo) {
        let data = createPhoto(photo);
        parentDiv.appendChild(data);
    });
}

function createPhoto(photo) {
    const mainDiv = document.createElement('div');
    mainDiv.className = "photo";
    const img = document.createElement('img');
    img.setAttribute('src', photo.url);
    img.setAttribute('alt', photo.name);
    img.setAttribute('id', photo.id);
    const content = document.createElement('h3');
    content.innerHTML = photo.information;
    mainDiv.appendChild(img);
    mainDiv.appendChild(content);
    return mainDiv;
}