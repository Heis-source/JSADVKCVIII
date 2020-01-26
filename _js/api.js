const API_KEY = 'Y0S88S6-43PM483-JJVJRF5-498SAER';
const URL = 'https://beerflix-api.herokuapp.com/api/v1/beers';
const config = {
    headers: {'X-API-KEY': API_KEY,}
};

function firstLoad (value) {
  
  let buildURL = `?limit=10&`;

  if (value) {
    if (value.indexOf("/") == -1) {
      buildURL = `?limit=10&search=${value}`;
    } else if (value.indexOf("/") >= 0) {
      buildURL = '';
    }
  }  
    axios.get(URL + buildURL , {
      responseType: 'json',
      headers: {
        'X-API-KEY': API_KEY,
      },
    })
  
    .then(function (response) {

      let control = 0;
      const beers = response.data.beers;
      const dataBeers = beers.map(result => {
        if (value) {
          if (value.indexOf("/") >= 0) {
            const searchDate = value.slice(3).toString();
            const foundDate =  result.firstBrewed.slice(3).toString();
            if ((foundDate == searchDate) && (control <= 9)) {
              control++;
              return `
              <div class="col mb-4">
                <div class="card">
                  <img src="${result.image}" class="card-img-top width: 18rem;" alt="${result.name}">
                  <div class="card-body">
                    <h5 class="card-title">${result.name}</h5>
                    <p class="card-text">${result.description}</p>
                    <a href="#/" onclick="showDetails(${result.beerId})" class="btn btn-primary btn-card">Details</a>
                    </a>
                  </div>
                </div>
              </div>`;
            }
          } else {
            return `
              <div class="col mb-4">
                <div class="card">
                  <img src="${result.image}" class="card-img-top width: 18rem;" alt="${result.name}">
                  <div class="card-body">
                    <h5 class="card-title">${result.name}</h5>
                    <p class="card-text">${result.description}</p>
                    <a href="#/" onclick="showDetails(${result.beerId})" class="btn btn-primary btn-card">Details</a>
                    </a>
                  </div>
                </div>
              </div>`;
          }
        } else {
            return `
              <div class="col mb-4">
                <div class="card">
                  <img src="${result.image}" class="card-img-top width: 18rem;" alt="${result.name}">
                  <div class="card-body">
                    <h5 class="card-title">${result.name}</h5>
                    <p class="card-text">${result.description}</p>
                    <a href="#/" onclick="showDetails(${result.beerId})" class="btn btn-primary btn-card">Details</a>
                    </a>
                  </div>
                </div>
              </div>`;
          }        
      });

      const firstList = document.getElementById(`principal`).innerHTML = dataBeers.join('');
        return `
        <div class="row row-cols-1 row-cols-md-2">
          ${firstList}
        </div>`;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {

    });
}



function showDetails(value) {
    
    axios.get(URL + `/${value}`, {
      responseType: 'json',
      headers: {
        'X-API-KEY': API_KEY,
      },
    })
    .then(function (response) {

    const beers = response.data.beer;
    const ingredients = beers.ingredients;
    const hops = ingredients.hops.map(result => {
      if (result) {
        return `
        <li>${result.name}: ${result.amount.value} ${result.amount.unit}</li>
      `}
    });
    const malt = ingredients.malt.map(result => {
      if (result) {
        return `
        <li>${result.name}: ${result.amount.value} ${result.amount.unit}</li>
      `}
    });
    const comment = beers.comments.map(result => {
      if (result) {
        const dateHour = result.dateComment.slice(11,19);
        const dateDay = result.dateComment.slice(0,10);
        return `
        <p class="card-text">${result.comment}</p>
        <p class="card-text">${dateHour} ${dateDay}</p>     
      `}
    });

      if (beers) {
        document.getElementById(`principal`).innerHTML = `
          <div class='row control'>
            <div class='col'>
                <img src="${beers.image}" class="rounded mx-auto d-block" alt="${beers.name}">
            </div>
          </div>
          <div class='row control'>
            <div class='col'>
              <div class="card">
                <div class="card-header">
                  ${beers.name}
                </div>
                <div class="card-body">
                  <div class='col'>
                    <p class="card-text"><strong>Year:</strong> <span>${beers.firstBrewed}</span></p> 
                    <p class="card-text"><strong>Price:</strong> <span>${beers.price} €</span></p>
                    <p class="card-text"><strong>Likes:</strong> <span id="like-text">${beers.likes}<a href='#/' onclick="likeLoad(${beers.beerId})"><i class="fas fa-thumbs-up rounded float-right"></i></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='row control'>
            <div class='col'>
              <div class="card">
                  <div class="card-header">
                  Description
                  </div>
                  <div class="card-body">
                      <p class="card-text">${beers.description}</p>
                  </div>
              </div>
            </div>
          </div>
          <div class='row control'>
            <div class='col'>
              <div class="card">
                <div class="card-header">
                    Ingredients
                </div>
                <div class="card-body">
                  <div class='row'>
                    <div class='col'>
                        <p class="card-text">Hops</p>
                        <ul>
                          ${hops.join('')}
                        </ul>
                    </div>
                    <div class='col'>
                        <p class="card-text">Malt</p>
                        <ul>
                          ${malt.join('')}
                        </ul>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                        <p class="card-text">Yeast</p>
                        <ul>
                          <li>${ingredients.yeast}</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='row control'>
            <div class='col'>
              <div class="card">
                <div class="card-header">
                Comments
                </div>
                <div class="card-body" id="commentzone">
                    ${comment.join('')}
                </div>
              </div>
            </div>
          </div>
          <div class='row control'>
            <div class='col'>
              <div class="card">
                <div class="card-body">
                  <form id="commentform">
                    <h5>New post</h5>
                    <textarea class="form-control control" placeholder="Feedback area! Fell Free!" required id="commenttext"></textarea>
                    <input type="submit" id="commentsend" class="btn btn-primary controlbutton" onclick="commentLoad(${beers.beerId});">
                  </form>
                </div>
              </div>
            </div>
          </div>`;    
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {

    });
}