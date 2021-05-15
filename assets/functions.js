//click on search bar and get data from it

// recipe-search-button - event listener for the click
var fetchButton = document.getElementById('recipe-search-button');

// recipe-search-input - to get the value
var recipeSearchInput = document.getElementById('recipe-search-input')

//getApi function is called when the fetchButton is clicked
function getApi() {
    // Insert the API url to get a list of your repos
    var requestUrl = `http://api.edamam.com/search?q=${recipeSearchInput.value}&app_id=46923f1d&app_key=5e710e80302e239cd7c90b4b531dd159&from=1&to=10`;
    fetch(requestUrl)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        data = data.hits
        //looping over the fetch response and inserting the URL of your repos into a list
        for (var i = 0; i < data.length; i++) {
          //Create a list element
          var listItem = document.createElement('li');
          var aUrl = document.createElement('a')
          aUrl.setAttribute('style', 'list-style: none')
          //Set the text of the list element to the JSON response's .html_url property
          aUrl.textContent = data[i].recipe.url;
          aUrl.href = data[i].recipe.url
          //Append the li element to the id associated with the ul element.
          repoList.appendChild(listItem);
          listItem.appendChild(aUrl)
        }
      });
  }
  fetchButton.addEventListener('click', getApi);



// container to attach API results to
var repoList = document.querySelector('ul');






