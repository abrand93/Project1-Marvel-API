var inputEl = $('#input');
var searchBtn = $('#search');
var charNames = ['Ant-Man', 'Black Panther','Bucky','Captain America','Captain Marvel','Doctor Strange','Drax','Falcon','Gamora','Groot','Hawkeye','Hulk','Iron Man','Mantis','Nebula','Pepper Potts','Rocket','Scarlet Witch','Shuri','Spider-Man','Star-Lord','Thor','Valkyrie','War Machine','Wasp','Wong']
var randomBtn = $('#random')
var dataList = $('#names')
var card = document.querySelector('#card')
    //auto-complete functionality
    $(document).ready(function(){
        $('#input').on("input",function(){ //input event listener triggered whenever a user types into search bar
            dataList.empty()
            var query = $(this).val()
            if(query.length >3){//minimum number of characthers that trigger autocomplete
                var marvelUrl = "http://gateway.marvel.com/v1/public/characters?nameStartsWith="+query+"&apikey=3a63bd6dec07e5572fe2f09b18064abe"
                    
                    fetch(marvelUrl)
                    .then((res) => res.json())
                    .then(function(data) {
    
                        var innerData = data.data.results; //traversing into the response object where name is found and getting the object
                        var tempArray = innerData.map(function(item){ //building an array that holds every charachter name for that search query
                            return item.name; //grabs the name value from each key of the innerData object
                            
                        })
                        $("#input").autocomplete({  //autocomplete ui feature of jQuery(takes an array to autocomplete a user input)
                            source: tempArray
                            });              
    
                    })

            }//end if-statement
    
        })
    })
    
     
    //search functionality
//search button event listener
searchBtn.on('click',function(){
    var nameChar = inputEl.val()
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+nameChar+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + nameChar   

        // Save search input to local storage
        var searches = JSON.parse(localStorage.getItem('searches')) || [];
        if (searches.indexOf(nameChar) === -1) {
            searches.push(nameChar);
            localStorage.setItem('searches', JSON.stringify(searches));
        }
        
// MARVEL fetch request
    fetch(marvelUrl)
    .then((res) => res.json())
    .then((data) => MarvelCard(data))

//OMDB fetch request
   // fetch(imdbUrl)
    //.then((res) => res.json())
    //.then((data) => console.log(data))

    

})

    //random avenger picker functionality
//pick random avenger button event listener
randomBtn.on('click', function(){
    var randomChar = Math.floor(Math.random()*charNames.length)
    var randomCharIs = charNames[randomChar]
    console.log(randomCharIs)
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters?name="+randomCharIs+"&limit=100&apikey=3a63bd6dec07e5572fe2f09b18064abe"
    var imdbUrl = "https://imdb-api.com/en/API/SearchSeries/k_h6mhz1ew/" + randomCharIs

    fetch(marvelUrl)
        .then((res) => res.json())
        
        .then((data) =>  MarvelCard(data))
      // fetch(imdbUrl)
       // .then((res) => res.json())
       // .then((data) =>console.log(data))
       
        
       
    })

    function MarvelCard(data){
        $("#card").empty()
        var thumbNail = document.createElement('img')
       var thumbNailRes = data.data.results[0].thumbnail.path
        thumbNail.setAttribute('src',thumbNailRes+'.jpg')
        var div = document.createElement('div')
        
        var avengerName = document.createElement('h2')
        var description = document.createElement('p')
        avengerName.textContent = data.data.results[0].name
        avengerName.classList = " m-2 text-center text-2xl font "
        thumbNail.classList = "content-center"
        description.classList = "p-5 m-2 font"
        card.appendChild(div)
        div.classList = 'bg-red-700 rounded-lg'
        div.appendChild(avengerName)
       
        description.textContent = data.data.results[0].description
        div.appendChild(thumbNail)
        div.appendChild(description)
        console.log(data.data.results[0].name)
        console.log(data)
        console.log(thumbNailRes)
       
    }
var searchTerm = getCharacterName('Spider-Man (12344)');

var maxChars = 20;
// wiki api 
fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`)
.then((data)=>data.json())
.then((result)=>console.log(result))

// Getting character name from reponse object title
function getCharacterName(title){
    var index = title.indexOf("(");  // Find the index of the opening parenthesis
    var characterName = title.substring(0,index).trim();  // taking only part of string before paranthesis and .trim() removes any spaces around our string
    return characterName;
}
