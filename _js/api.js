import api from './modules/api.js';

const { getBeers, getBeerDetail } = api();

export const templateBeers = async () => {
  getBeers().then(data => {
    const dataBeers = data.map(beer => {
      console.log(beer)
      return `
        <div class="col mb-4">
          <div class="card">
            <img src="${beer.image}" class="card-img-top width: 18rem;" alt="${beer.name}">
            <div class="card-body">
              <h5 class="card-title">${beer.name}</h5>
              <p class="card-text">${beer.description}</p>
              <a href="#" onclick="showDetails(${beer.beerId})" class="btn btn-primary btn-card">Details</a>
              </a>
            </div>
          </div>
        </div>`;
    })
    const firstList = document.getElementById(`principal`).innerHTML = dataBeers.join('');
    return `
      <div class="row row-cols-1 row-cols-md-2">
        ${firstList}
      </div>`;
  })
}


export const showDetails = async id => {
  getBeerDetail(id).then(data => {
    console.log(data);
    const dataBeers = data.map(beer => {

    const ingredients = beer.ingredients;

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
    
    const comment = beer.comments.map(result => {
      if (result) {
        const dateHour = result.dateComment.slice(11,19);
        const dateDay = result.dateComment.slice(0,10);
        return `
        <p class="card-text">${result.comment}</p>
        <p class="card-text">${dateHour} ${dateDay}</p>     
      `}
    });
      return `
      <div class='row control'>
      <div class='col'>
          <img src="${beer.image}" class="rounded mx-auto d-block" alt="${beer.name}">
      </div>
    </div>
    <div class='row control'>
      <div class='col'>
        <div class="card">
          <div class="card-header">
            ${beer.name}
          </div>
          <div class="card-body">
            <div class='col'>
              <p class="card-text"><strong>Year:</strong> <span>${beer.firstBrewed}</span></p> 
              <p class="card-text"><strong>Price:</strong> <span>${beer.price} €</span></p>
              <p class="card-text"><strong>Likes:</strong> <span id="like-text">${beer.likes}<a href='#/' onclick="likeLoad(${beers.beerId})"><i class="fas fa-thumbs-up rounded float-right"></i></a></p>
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
                <p class="card-text">${beer.description}</p>
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
    })
  })
}