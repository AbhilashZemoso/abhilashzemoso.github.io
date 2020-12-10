const formName = document.querySelector('#form-name');
const formEmail = document.querySelector('#form-email');

const contactForm = document.querySelector('#contact-form');

contactForm.onsubmit = function(e){
    const name = formName.value;
    const email = formEmail.value;
    if(name!==""){
        processValidName();
    }
    else{
        processEmptyName();
    }
    if(email.match("[a-zA-Z.]+(@gmail.com)$")){
        processValidEmail();
    }
    else{
        processInValidEmail();
    }
    e.preventDefault();
}

function processEmptyName(){
    formName.classList.add("invalid");
    const message = document.querySelector('#name-error');
    message.style.display = "block";
}

function processValidName(){
    formName.classList.remove("invalid");
    const message = document.querySelector('#name-error');
    message.style.display = "none";
}

function processInValidEmail(){
    formEmail.classList.add("invalid");
    const message = document.querySelector('#email-error');
    message.style.display = "block";
}

function processValidEmail(){
    formEmail.classList.remove("invalid");
    const message = document.querySelector('#email-error');
    message.style.display = "none";
}
