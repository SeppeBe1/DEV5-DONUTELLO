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
    let datum = new Date(json.data.donut[i].datum);
    console.log(json.data.donut[i]);

    let donut = `
                  <div class="infoDonut" data-id="${json.data.donut[i]._id}">
                    <img class="infoImg" src="${json.data.donut[i].donutPreview}" alt="donut">
                    <p>Bedrijf: <span>${json.data.donut[i].bedrijfsnaam}</span></p>
                    <p>postcode: <span>${json.data.donut[i].postcode}</span></p>
                    <p>Datum: <span>${datum.toLocaleDateString()}</span></p>
                    <a class="btnOrder" href="#">Bestel</a>
                  </div>
    `;
    document.querySelector(".gallery").insertAdjacentHTML("afterbegin", donut);
  }
});

