Vue.component('donut',{
  data: function(){
    return{ showBtn: false

    }
  },
  template: `
          <div class="donut">
          <img class="donutImg" v-bind:src=donut.donutPreview alt="altDonut">
            <div class="donutData" >
              <h2>Donut data</h2>
              <span>Name: {{ donut.donutNaam }}</span>
              <span>Business: {{ donut.bedrijfsnaam }}</span>
              <span class="date">{{format_date(donut.datum)}}</span> 
              <span>Amount: {{ donut.hoeveelheid }}</span>
            </div>
              
            <div class="ingredients">
              <h2>Ingredients</h2>
              <span>Topping: {{ donut.donutTopping }}</span>
              <span>Glaze: {{ donut.donutGlazuur}}</span>
              <span>Dough: {{ donut.donutDeeg }}</span>
              <span>Filling: {{ donut.donutVulling }}</span> 
            </div>

            <div class="btnAdmin">
            <a v-on:click.prevent="changeButton" v-if="donut.ready === false" :data-id="donut._id" class="btnStatus btnProduction" href="#">In productie</a>
            <a v-on:click.prevent="changeButton" v-if="donut.ready === true" :data-id="donut._id" class="btnStatus btnReady" href="#">Klaar</a>
              <a v-on:click.prevent="deleteDonut" class="btndelete" href="#" :data-id="donut._id">delete</a>
            </div>
          </div>
            `,
            props:["donut"],

            methods:{
              changeButton(e){
                let token = window.localStorage.getItem("token");
                this.donut.ready = !this.donut.ready;
                if( this.donut.ready === false){
                fetch (`https://donuttelloapi.onrender.com/api/v1/donuts/${e.target.getAttribute("data-id")}`, {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + token,
                  },
                  body: JSON.stringify({
                      "_id": e.target.getAttribute("data-id"),
                      "ready": false,
                  }),
                  }).then(response => {
                      return response.json();
              
                  }).then(json => {
                      if(json.status == "error"){
                      } else  if(json.status == "success"){
                      }
                  });
                  e.path[2].style.borderColor = "#FB9144";
                } else if(this.donut.ready === true){
                  fetch (`https://donuttelloapi.onrender.com/api/v1/donuts/${e.target.getAttribute("data-id")}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                    body: JSON.stringify({
                        "_id": e.target.getAttribute("data-id"),
                        "ready": true,
                    }),
                    }).then(response => {
                        return response.json();
                
                    }).then(json => {
                        if(json.status == "error"){
                        } else  if(json.status == "success"){
                        }
                    });
                e.path[2].style.borderColor = "#7FF835";
                }  
              },

              format_date(date){
                let datum = new Date(date).toLocaleDateString();
                return "Date: " + datum;
               },

              deleteDonut(e){
                let currentDonut = e.target.parentElement.parentElement;
                e.target.parentElement.parentElement.classList.add("removed");
                var donutId = e.target.getAttribute('data-id');
                let token = window.localStorage.getItem("token");

                currentDonut.addEventListener("transitionend",() => {
                  currentDonut.remove();
              })
                fetch (`https://donuttelloapi.onrender.com/api/v1/donuts/${donutId}`, {
                      method: "DELETE",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": "Bearer " + token,
                      }
                  }).then(response => {
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
                return response.json();
            })
            .then(json => {
              for( let i = 0; i < json.data.donut.length ; i++){
              that.donuts.push(json.data.donut[i]);
              }
            });
        },
      },

  });