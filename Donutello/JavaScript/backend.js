Vue.component('donut',{
  data: function(){
    return{ showBtn: false
    }
  },
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
            <a v-on:click.prevent="changeButton" v-if="this.showBtn === false" class="btnProduction" href="#">In productie</a>
            <a v-on:click.prevent="changeButton" v-if="this.showBtn === true" class="btnReady" href="#">Klaar</a>
              <a v-on:click.prevent="deleteDonut" class="btndelete" href="#" :data-id="donut._id">delete</a>
            </div>
          </div>
            `,
            props:["donut"],
            methods:{
              changeButton(){
                this.showBtn = !this.showBtn;
                if( this.showBtn === false){
                  e.path[2].style.borderColor = "#FB9144";
                } else if(this.showBtn === true){
                e.path[2].style.borderColor = "#7FF835";
                }
                
              },

              deleteDonut(e){
                console.log(e.target.getAttribute('data-id'));
                var donutId = e.target.getAttribute('data-id');
                let token = window.localStorage.getItem("token");
                console.log(token); 
                fetch (`https://donuttelloapi.onrender.com/api/v1/donuts/${donutId}`, {
                      method: "DELETE",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": "Bearer " + token,
                      }
                  }).then(response => {
                    console.log(response);
                    return response.json();
                });
              }
            }
});

var app = new Vue({
    el: '#app',
      data: {
        donuts: [],
      },

      mounted: function(){
        this.getDonuts();
        this.changeButton(e);
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
        },

      }
  });