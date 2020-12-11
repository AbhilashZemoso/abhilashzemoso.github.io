function init() {
    getAndSetData();
    setUpGalleryAdmin();
    photoAddEvent();
    closeAddEvent();
}

function photoAddEvent(){
    const photos = document.querySelectorAll(".photo");
    photos.forEach(function(photo){
        photo.addEventListener('click',displayPhotoDetails);
    });
}

function closeAddEvent(){
    const close = document.querySelector(".close");
    close.addEventListener('click',hidePhotoDetails);
}

function displayPhotoDetails(){
    const photoDetails = document.querySelector("#photo-details").style.display="block";
    const galleryAdmin = document.querySelector('#gallery-admin').style="-webkit-filter: blur(8px);";
    //add code
    
}

function hidePhotoDetails(){
    const photoDetails = document.querySelector("#photo-details").style.display="none";
    const galleryAdmin = document.querySelector('#gallery-admin').style="-webkit-filter: none;";
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