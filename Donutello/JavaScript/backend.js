// import Vue from 'vue';
var app = new Vue({
    el: '#app',
      data: { 
        author: 'Sepz',
        donut: 'cranberry' 
      },

      mounted: function(){
        this.getDonuts();
      },

      methods:{
        getDonuts: function(){
          console.log("kaas");
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
              console.log(json.data.donut);

            });
        }

      }
  })