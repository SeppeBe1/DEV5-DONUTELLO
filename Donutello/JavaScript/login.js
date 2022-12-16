let usernameForm = document.querySelector(".loginUsername");
let passwordForm = document.querySelector(".loginPassword");
let btnSubmit = document.querySelector(".subBtn");
let validation = document.querySelector(".formValidation");

btnSubmit.addEventListener("click",function(e){
    console.log(passwordForm.value);
    e.preventDefault();
    fetch ("https://donuttelloapi.onrender.com/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "username": usernameForm.value,
        "password": passwordForm.value
    }),
    }).then(response => {
        console.log(response);
        return response.json();

    }).then(json => {
        console.log(json.status);
        if(json.status = "failed"){
            validation.innerHTML = "Invalid username/password"
        } else  if(json.status = "succes"){
            window.location.href = "../Pages/backend.html";
        }
    });
});
