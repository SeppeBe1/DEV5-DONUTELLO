Vue.component('donut',{
  template: `
          <div class="donut">
          <img class="donutImg" src="../assets/donutUndrawTest.svg" alt="altDonut">
            <div class="donutData" >
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
              <a v-on:click="deleteDonut" class="btndelete" href="#" :data-id="donut._id">delete</a>
            </div>
          </div>
            `,
            props:["donut"],
            methods:{
              deleteDonut(e){
                console.log(e.target.getAttribute('data-id'));
                var that = this;
                var donutId = e.target.getAttribute('data-id');
                fetch (`DELETE api/v1/donuts/${donutId}`, {
                      method: "DELETE",
                      headers: {
                          "Content-Type": "application/json"
                      }
                  });
              }
            }

            // <a v-on:click.prevent="changeButton" class="btnProduction" href="#">In productie</a>
});

var app = new Vue({
    el: '#app',
      data: {
        donuts: [],
        // productionbtn: true,
        // readybtn: false
      },

      mounted: function(){
        this.getDonuts();
      },

      methods:{
        changeButton: function(e){
          console.log(e);
          this.text = "kaas";
          // this.productionbtn = !this.productionbtn;
          // this.readybtn = !this.readybtn;
        },
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
        },

      }
  });