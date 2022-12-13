Vue.component('donut',{
  template: `
            <div>
              <div class="donutData">
              <img class="donut" :src="image" :alt="altDonut">
              <span>Name: {{ name }}</span>
              <span>Business: {{ business }}</span>
              <span>Author: {{ author }}</span>
              <span>Date: {{ date }}</span>
              <span>Amount: {{ amount }}</span>
            </div>
              
            <div class="ingredients">
              <h2>Ingredients</h2>
              <span>Topping: {{ topping }}</span>
              <span>Glaze: {{ glaze }}</span>
              <span>Dough: {{ dough }}</span>
              <span>Filling: {{ filling }}</span> 
            </div>

            <div class="btn"></div>
              <a href="">In productie</a>
              <a href="">delete</a>
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
              that.donuts.push(json.data.donut);
            });
        }

      }
  })