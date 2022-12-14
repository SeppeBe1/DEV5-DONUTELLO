Vue.component('donut',{
  template: `
          <div class="donut">
          <img class="donutImg" src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg" alt="altDonut">
            <div class="donutData">
              <h2>Donut data</h2>
              <span>Name: {{ donut.donutNaam }}</span>
              <span>Business: {{ donut.bedrijfsnaam }}</span>
              <span>Date: {{ donut.datum }}</span>
              <span>Amount: {{ donut.hoeveelheid }}</span>
            </div>
              
            <div class="ingredients">
              <h2>Ingredients</h2>
              <span>Topping: {{ donut.donutTopping }}</span>
              <span>Glaze: {{ donut.donutGlazuur }}</span>
              <span>Dough: {{ donut.donutDeeg }}</span>
              <span>Filling: {{ donut.donutVulling }}</span> 
            </div>

            <div class="btnAdmin">
            <a class="btnReady" href="#">Klaar!</a>
              <a class="btnProduction" href="#">In productie</a>
              <a class="btndelete" href="#">delete</a>
            </div>
          </div>
            `,
            props:["donut"]
});

var app = new Vue({
    el: '#app',
      data: {
        donuts: [] 
      },

      mounted: function(){
        this.getDonuts();
      },

      methods:{
        getDonuts: function(){
          var that = this;
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
              for( let i = 0; i < json.data.donut.length ; i++){
              that.donuts.push(json.data.donut[i]);
              }
            });
        }

      }
  })