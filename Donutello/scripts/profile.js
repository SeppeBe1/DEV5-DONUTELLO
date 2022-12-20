let password = document.querySelector(".password");
let repPassword = document.querySelector(".repPassword");
let btnSubmit = document.querySelector(".subBtn");
let validation = document.querySelector(".formValidation");

btnSubmit.addEventListener("click",function(e){
    e.preventDefault();
    console.log(password.value);
    console.log(repPassword.value);
    let token = window.localStorage.getItem("token");

    if(password.value == repPassword.value ){

        fetch ("https://donuttelloapi.onrender.com/users/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                "username": "Donuttell0",
                "password": password.value
            }),
            }).then(response => {
                console.log(response);
                return response.json();
        
            }).then(json => {
                console.log(json)

                if(json.status == "error"){
                    validation.innerHTML = "Password did not change";
                    validation.style.color = "red";
                } else  if(json.status == "success"){
                    validation.innerHTML = "Password succesfully changed";
                    validation.style.color = "green";
                    password.value = "";
                    repPassword.value = "";
                }
            });

    } else {
        validation.innerHTML = "Password incorrect";
        validation.style.color = "red";
    }
});
