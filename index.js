

// put your own value below!
const apiKey = '4Q6I0BZRnkEBb6jDP1vwrPed96KVyxyDDWg2CToo'; 
const searchURL = 'https://developer.nps.gov/api/v1/park';
//Query String Parameters - parkCode=acad,dena

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function finalResult(responseJson){  
  console.log(responseJson);
  let inputhtml = '';
  for(let i=0; i<responseJson.data.length; i++){
    const park = responseJson.data[i];
    const name = park.fullName;
    const description = park.description;
    const webUrl = park.url;

  
    inputhtml += `<li>
  <p>Name:${name}</p>
  <p>Description:${description}</p>
  <p>Website URL:${webUrl}</p>
 </li>`;
  } 
  $('#results-list').html(inputhtml);
  $('#results').removeClass('hidden');
}

function getNationalPark(query, maxResults=10) {
  const params = {
    key: apiKey,
    stateCode: query,
    limit:maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => finalResult(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#result-list').empty();
    const state = $('input[type="text"]').val();
    const maxResults = $('input[type="number"]').val();
    getNationalPark(state, maxResults);
  });
}

$(watchForm);