//click on search bar and get data from it
var repoList = document.getElementById('ingredients');
var containerList = document.getElementById('search-results');
var recipeExtraInfoContainer = document.getElementById('recipeExtraInfoContainer');
var recipeContainer = document.querySelector('.recipe-display');


//searchResults page + extra recipe detail variables
var recipeSearchResultContainer;
var recipeSearchResultImage;
var recipeSearchResultHeadings;
var recipeSearchResultButton;
//var displayRecipeContainer;
var displayRecipeImage;
var displayRecipeHeading;
var displayRecipeUnorderedList;
var displayIngredients;
var displayRecipeVideo;
var cardImage = document.querySelectorAll(".card-image");
var cardContent = document.querySelectorAll(".card-content");
var cardAction = document.querySelectorAll(".card-action");
var recipeImage = document.querySelector(".recipe-image")
var recipeContent = document.querySelector(".recipe-content")

// recipe-search-button - event listener for the click
var fetchButton = document.getElementById('recipe-search-button');

// recipe-search-input - to get the value
var recipeSearchInput = document.getElementById('recipe-search-input')

var historyEl = document.querySelector(".search-history")

var historyList =[]
var searchHistory = localStorage.getItem('search-history')
console.log(searchHistory)
if (searchHistory) {
    searchHistory = (searchHistory)
    var searchList = searchHistory.length
    if (searchHistory.length > 3) {
        searchList = 3
    }
    for (var i= 0; i < searchList; i++){
        var listItem = document.createElement('li')
        listItem.textContent = searchHistory[i]
        historyEl.append(listItem)
    }
}
//getApi function is called when the fetchButton is clicked
function getApi(e) {
  e.preventDefault();
  // Insert the API url to get a list of your repos
  var requestUrl = `https://api.edamam.com/search?q=${recipeSearchInput.value}&app_id=46923f1d&app_key=5e710e80302e239cd7c90b4b531dd159&from=1&to=7`;

  fetch(requestUrl)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      data = data.hits
      searchReults(data);

    });
}

function youtubeAPI(data) {
  var youtubeHeading = data.recipe.label;
  console.log(youtubeHeading);

  var youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${youtubeHeading}&key=AIzaSyDIguCz_5VxSSQ_HIouV7kqUS4rNjWoi0A`;

  fetch(youtubeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayYoutubeVideos(data);
    })
}

function searchReults(data) {


  containerList.classList.remove("hidden")

  for (var i = 0; i < data.length; i++) {
    cardImage[i].innerHTML = '';
    cardContent[i].innerHTML = '';
    cardAction[i].innerHTML = '';
    recipeImage.innerHTML = '';
    recipeContent.innerHTML = '';
  }
  //looping over the fetch response and inserting the URL of your repos into a list
  for (var i = 0; i < data.length; i++) {
    recipeSearchResultContainer = document.createElement('div');
    recipeSearchResultImage = document.createElement('img');
    recipeSearchResultHeading = document.createElement('h3');
    recipeSearchResultButton = document.createElement('button');
    // pull image (data[i].recipe.image)
    recipeSearchResultImage.setAttribute('src', data[i].recipe.image)
    recipeSearchResultHeading.textContent = data[i].recipe.label;
    recipeSearchResultButton.textContent = "More Info";
    containerList.appendChild(recipeSearchResultContainer);
    // containerList.appendChild(recipeSearchResultImage);
    cardImage[i].appendChild(recipeSearchResultImage);
    cardContent[i].appendChild(recipeSearchResultHeading);
    cardAction[i].appendChild(recipeSearchResultButton);
    recipeDisplay(data[i]);
    // add CSS to make the button bigger            
  }
  // localStorage.setItem('search-history', recipeSearchInput.value)
  // console.log(localStorage.getItem('search-history'))
  
    // var dropd = document.getElementById("savedrop").value;
    
    historyList.unshift(recipeSearchInput.value);
    localStorage.setItem("search-history", JSON.stringify(historyList));
    console.log(historyList)
}

function recipeDisplay(data) {
  recipeSearchResultButton.addEventListener('click', function () {
    recipeContainer.classList.remove("hidden")
    recipeImage.innerHTML = '';
    recipeContent.innerHTML = '';
    console.log(data);
    displayRecipeContainer = document.createElement('div');
    displayRecipeImage = document.createElement('img');
    displayRecipeHeading = document.createElement('h3');
    displayRecipeUnorderedList = document.createElement('ul');

    //Grab data for each element from the api
    displayRecipeImage.setAttribute('src', data.recipe.image);
    displayRecipeHeading.textContent = data.recipe.label;

    //For loop for ingredients
    for (var i = 0; i < data.recipe.ingredientLines.length; i++) {
      displayIngredients = document.createElement('li');
      displayIngredients.textContent = data.recipe.ingredientLines[i]
      displayRecipeUnorderedList.append(displayIngredients);
    }

    youtubeAPI(data);

    recipeImage.append(displayRecipeImage);
    recipeContent.append(displayRecipeHeading);
    recipeContent.append(displayRecipeUnorderedList);



  })
}

function displayYoutubeVideos(data) {
  for (var i = 0; i < data.items.length; i++) {
    var youtubeId = data.items[i].id.videoId;
    displayRecipeVideo = document.createElement('iframe');
    displayRecipeVideo.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}`);
    recipeContent.append(displayRecipeVideo);
  }
}

//displayRecipeContainer;
//displayRecipeHeading;
//displayRecipeUnorderedList;
//displayRecipeList;
//displayRecipeVideo;

// function recipeExtraInfo {
//     recipeSearchResultHeading.textContent = data[i].recipe.label;
//     recipeExtraInfoContainer.appendChild(recipeSearchResultHeading);
// }







fetchButton.addEventListener('click', getApi);
/* fetchButton.addEventListener('click', function(e){
  e.preventDefault();
  console.log("button works")
  // log search result
  console.log(recipeSearchInput.value)
  //add recent search
  document.body.innerHTML = "Recent searches:"
  //add 

});

*/

// container to attach API results to
var repoList = document.querySelector('ul');




