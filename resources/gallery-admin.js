let newId = 9

function init() {
    getAndSetData();
    setTimeout(() => {
        generateGalleryAdminPage();
    }, 50);
}

function generateGalleryAdminPage() {
    setUpGalleryAdmin();
    photoAddEditEvent();
    photoAddDeleteEvent();
    closeAddEvent();
    addPhotoDetailsOnSubmitEvent();
}

function addPhotoDetailsOnSubmitEvent() {
    const photoDetailsForm = document.querySelector('#photo-form');

    photoDetailsForm.onsubmit = function (e) {
        e.preventDefault();
        const details = getFormPhotoDetails();

        if(validatePhotoDetails(details)===true){
            setPhotoDetails(details);
            hidePhotoDetails();
            resetPhotos();
        }
    }
}

function removeErrors(){
    document.querySelector("#empty-name").style.display = 'none';
    document.querySelector('#photo-name').classList.remove('invalid');

    document.querySelector("#url-error").style.display = 'none';
    document.querySelector("#empty-url").style.display = 'none';
    document.querySelector('#photo-url').classList.remove('invalid');

    document.querySelector("#date-error").style.display = 'none';
    document.querySelector("#empty-date").style.display = 'none';
    document.querySelector('#photo-date').classList.remove('invalid');
}

function validatePhotoDetails(details){
    let isValid = true;

    removeErrors();

    if(details.name===""){
        document.querySelector("#empty-name").style.display = 'block';
        document.querySelector('#photo-name').classList.add('invalid');
        isValid = false;
    }

    if(details.url===""){
        document.querySelector("#empty-url").style.display = 'block';
        document.querySelector('#photo-url').classList.add('invalid');
        isValid = false;

        document.querySelector("#url-error").style.display = 'none';
    }
    else if(!details.url.match("^(http:|https:|data:image).*(.jpg|.jpeg|.png)+.*")){
        document.querySelector("#url-error").style.display = 'block';
        document.querySelector('#photo-url').classList.add('invalid');
        isValid = false;

        document.querySelector("#empty-url").style.display = 'none';
    }

    if(details.date===""){
        document.querySelector("#empty-date").style.display = 'block';
        document.querySelector('#photo-date').classList.add('invalid');
        isValid = false;

        document.querySelector("#date-error").style.display = 'none';
    }
    else if(!details.date.match("[0-9]{2}/[0-9]{2}/[0-9]{4}") ||
            !isValidDate(details.date)){
        document.querySelector("#date-error").style.display = 'block';
        document.querySelector('#photo-date').classList.add('invalid');
        isValid = false;

        document.querySelector("#empty-date").style.display = 'none';
    }

    return isValid;
}

function isValidDate(data){
    arr = data.split("/");
    const date = new Date(arr[2],arr[1]-1,arr[0]);

    const ToDate = Date.now();

    if(arr[0]!=date.getDate()||arr[1]-1!=date.getMonth()||arr[2]!=date.getFullYear()){
        return false;
    }

    if (date > ToDate ){
          return false;
     }
    return true;
}

function resetPhotos() {
    document.querySelector(".photos").innerHTML = '';
    generateGalleryAdminPage();
}

function photoAddEditEvent() {
    const photos = document.querySelectorAll("#edit-icon");
    photos.forEach(function (photo) {
        photo.addEventListener('click', displayPhotoDetails);
    });
}

function photoAddDeleteEvent() {
    const photos = document.querySelectorAll("#delete-icon");
    photos.forEach(function (photo) {
        photo.addEventListener('click', deletePhoto);
    });
}

function deletePhoto() {
    const photoDiv = this.parentElement.parentElement;
    const imgElement = photoDiv.querySelector('img');
    const theId = imgElement.id;

    photos = getPhotos();

    let ind = 0;
    let theIndex = -1;

    photos.filter((photo) => {
        if (photo.id == theId) {
            theIndex = ind;
        }
        ind++;
    });

    photos.splice(theIndex, 1);

    setPhotos(photos);

    resetPhotos();
}

function closeAddEvent() {
    const close = document.querySelector(".close");
    close.addEventListener('click', hidePhotoDetails);
}

function displayPhotoDetails() {
    document.querySelector("#photo-details").style.display = "block";
    document.querySelector('#gallery-admin').style = "-webkit-filter: blur(8px);";
    let details = getPhotoDetails(this.parentElement.parentElement);

    removeErrors();
    setFormPhotoDetails(details);
}

function displayAddPhoto() {
    document.querySelector("#photo-details").style.display = "block";
    document.querySelector('#gallery-admin').style = "-webkit-filter: blur(8px);";
    
    let details = getDefaultPhotoDetails();

    setFormPhotoDetails(details);
}

function getDefaultPhotoDetails(){
    let details = {
        'id':-1,
        'url':'',
        'name':'',
        'date':'',
        'information':''
    };
    return details;
}

function getPhotoDetails(divContent) {
    let details = {};

    const imgContent = divContent.querySelector('img');

    details.id = imgContent.id;
    details.url = imgContent.src;
    details.name = imgContent.alt;
    details.date = imgContent.getAttribute('date');
    details.information = imgContent.getAttribute('information');

    return details;
}

function setPhotoDetails(details) {

    let photos = getPhotos();

    if (details.id == -1) {
        details.id = newId;
        newId++;
        photos.push(details);
    } else {
        let photo = photos.filter(obj => {
            return obj.id == details.id;
        });
        photo = photo[0];

        photo.url = details.url;
        photo.name = details.name;
        photo.date = details.date;
        photo.information = details.information;
    }

    setPhotos(photos);
}

function setFormPhotoDetails(details) {
    const photoDetails = document.querySelector("#photo-details");

    photoDetails.querySelector("#photo-id").value = details.id;
    photoDetails.querySelector("#photo-name").value = details.name;
    photoDetails.querySelector("#photo-url").value = details.url;
    photoDetails.querySelector("#photo-date").value = details.date;
    photoDetails.querySelector("#photo-information").value = details.information;
}

function getFormPhotoDetails() {
    const photoDetails = document.querySelector("#photo-details");

    let details = {};

    details.id = photoDetails.querySelector("#photo-id").value;
    details.name = photoDetails.querySelector("#photo-name").value;
    details.url = photoDetails.querySelector("#photo-url").value;
    details.date = photoDetails.querySelector("#photo-date").value;
    details.information = photoDetails.querySelector("#photo-information").value;

    return details;
}

function hidePhotoDetails() {
    const photoDetails = document.querySelector("#photo-details").style.display = "none";
    const galleryAdmin = document.querySelector('#gallery-admin').style = "-webkit-filter: none;";
}


function getAndSetData() {
    let fileurl = '/resources/gallery.json';
    const out = fetch(fileurl)
        .then(rawData => rawData.text())
        .then(function (jsonData) {
            let data = JSON.parse(jsonData);
            setPhotos(data);
            return data;
        })
}

function getPhotos() {
    const data = sessionStorage.getItem('photos');
    const photos = JSON.parse(data);
    return photos;
}

function setPhotos(photos) {
    sessionStorage.setItem('photos', JSON.stringify(photos));
}

function setUpGalleryAdmin() {
    generatePhotos(getPhotos());
}