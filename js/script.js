
$(document).ready(function(){
    $("#search").click(function(){
        $('.search-box').slideToggle();
    });
  
    window.addEventListener('scroll',function(){
        let header=document.querySelector('.nav-bar');
        header.classList.toggle('scroll',window.scrollY >0)
    })
  });


var app = new Vue({
    el: '#app',
    data: {
      query:"",
      apikey:"b7ccd3b571de65818efd8d90d551616e",
      lang:"it-IT",
      searchElement:0,
      generi:[],
      popular:[],
      mostpopular:'', 
      scrollcount:0,
      scrollclick:0, 
      movieChecked:0,
    },
    methods:{
        search(){
               this.searchElement=[];
            
               axios
        .get('https://api.themoviedb.org/3/search/movie',{
            params:{
                api_key: this.apikey,
                query:this.query,
                language:this.lang,
            }
        })
        .then((result) => {
           this.searchElement.push(...result.data.results);
           console.log(this.searchElement);
           //filtriamo le categorie 
           
        })
        .catch(error => console.log('errore'));
        
        axios
        .get('https://api.themoviedb.org/3/search/tv',{
            params:{
                api_key: this.apikey,
                query:this.query,
                language:this.lang,
            }
        })
        .then((result) => {
           
            this.searchElement=this.searchElement.concat(result.data.results);
           console.log(this.searchElement);
           //filtriamo le categorie 
           
        })
        .catch(error => console.log('errore'));
        },
        clear(){
           (this.query.length==0)?this.searchElement=[] :'';
            
        },
        star(array){
            return Math.floor(array.vote_average/2);
        },
         getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
         },
         checked(index,array){
             this.movieChecked=array[index];
             console.log(array[index]);
             console.log(this.movieChecked);
         },
         closeChecked(){
             
             this.movieChecked=0;
         }

       

   
    },
    mounted() { 
         axios
            .get('https://api.themoviedb.org/3/trending/all/week',{
                params:{
                    api_key: this.apikey,
                    language:this.lang,
                }
            })
            .then((result) => {
                let a=0;
               this.popular=result.data.results;
               console.log(this.popular);
               this.popular.forEach(element => {
                   if(element.popularity>a){
                       a=element.popularity;
                       this.mostpopular=element;
                   }
                   
               });
               console.log(this.mostpopular);
               
            })
            .catch(error => console.log('errore'));
    }
  });