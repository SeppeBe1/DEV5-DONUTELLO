fetch ("https://donuttelloapi.onrender.com/api/v1/donuts", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(response => {
    //console.log(response);
    return response.json();

})
.then(json => {
  for(let i = 0; i < json.data.donut.length ; i++ ){

    let donut = `
                  <div class="infoDonut" data-id="${json.data.donut[i]._id}">
                    <img class="infoImg" src="../assets/donutUndrawTest.svg" alt="donut">
                    <p>Bedrijf: <span>${json.data.donut[i].bedrijfsnaam}</span></p>
                    <p>postcode: <span>${json.data.donut[i].postcode}</span></p>
                    <a class="btnOrder" href="#">Bestel</a>
                  </div>
    `;
    document.querySelector(".gallery").insertAdjacentHTML("afterbegin", donut);
  }
});

