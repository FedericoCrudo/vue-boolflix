
$(document).ready(function(){
    $("#search").click(function(){
        $('.search-box').slideToggle();
    });
    $("windows").scroll(function(){
        $('nav-bar').toggleClass('scroll',this.scrollTop())
    });



  });


var app = new Vue({
    el: '#app',
    data: {
      query:"",
      apikey:"b7ccd3b571de65818efd8d90d551616e",
      lang:"it-IT",
      searchElement:[],
    },
    methods:{
        search(){
               axios
        .get('https://api.themoviedb.org/3/search/multi',{
            params:{
                api_key: this.apikey,
                query:this.query,
                language:this.lang,
            }
        })
        .then((result) => {
           this.searchElement = result.data.results;
           console.log(this.searchElement);
           //filtriamo le categorie 
           
        })
        .catch(error => console.log('errore'));
        }
   
    }
  });