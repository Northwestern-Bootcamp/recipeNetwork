//click on search bar and get data from it
var repoList = document.getElementById('ingredients');
var containerList = document.getElementById('search-results');
var recipeExtraInfoContainer = document.getElementById('recipeExtraInfoContainer');


//searchResults page + extra recipe detail variables
var recipeSearchResultContainer 
var recipeSearchResultImage 
var recipeSearchResultHeadings
var recipeSearchResultButton
var cardImage = document.querySelectorAll(".card-image");
var cardContent = document.querySelectorAll(".card-content");
var cardAction = document.querySelectorAll(".card-action");

// recipe-search-button - event listener for the click
var fetchButton = document.getElementById('recipe-search-button');

// recipe-search-input - to get the value
var recipeSearchInput = document.getElementById('recipe-search-input')

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

function searchReults(data) {
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
            // recipeSearchResultButton.addEventListener('click', recipeExtraInfo())
            containerList.appendChild(recipeSearchResultContainer); 
            // containerList.appendChild(recipeSearchResultImage);
            cardImage[i].appendChild(recipeSearchResultImage);
            cardContent[i].appendChild(recipeSearchResultHeading);
            cardAction[i].appendChild(recipeSearchResultButton);
            // add CSS to make the button bigger            
        }
    }

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






