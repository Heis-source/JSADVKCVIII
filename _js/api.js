import api from './modules/api.js';

const { getBeers, getBeerDetail, likeLoad } = api();

export const templateBeers = async () => {
  getBeers().then(data => {
    const dataBeers = data.map(beer => {
      return `
        <div class="col mb-4">
          <div class="card">
            <img src="${beer.image}" class="card-img-top width: 18rem;" alt="${beer.name}">
            <div class="card-body">
              <h5 class="card-title">${beer.name}</h5>
              <p class="card-text">${beer.description}</p>
              <a href="/details/${beer.beerId}" class="btn btn-primary btn-card">Details</a>
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

const arrayReader = (array) => {
  const arrayReader = array.map( (i) => {
      return i.name;
  }).join(", ");

  return arrayReader;
}

const commentLoad = (array) => {
  const commentLoader = array.map( (i) => {
    return `
      <p class="card-text">${i.comment}</p>
      <p class="card-text">${i.dateComment}</p>`
  }).join(' ');

  return commentLoader;
}

export const showDetails = async id => {
  getBeerDetail(id).then(beer => {

    const hopsBeer = beer.ingredients.hops;
    const maltBeer = beer.ingredients.malt;
    const commentBeer = beer.comments;

    let templateDetailBeers = `
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
              <p class="card-text"><strong>Likes:</strong> <span id="like-text">${beer.likes}<a href='' id="like"><i class="fas fa-thumbs-up rounded float-right"></i></a></p>
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
                    ${arrayReader(hopsBeer)}
                  </ul>
              </div>
              <div class='col'>
                  <p class="card-text">Malt</p>
                  <ul>
                  ${arrayReader(maltBeer)}
                  </ul>
              </div>
            </div>
            <div class='row'>
              <div class='col'>
                  <p class="card-text">Yeast</p>
                  <ul>
                    <li></li>
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
            ${commentLoad(commentBeer)}
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
              <input type="submit" id="commentsend" class="btn btn-primary controlbutton" onclick="commentSend(${beer.beerId})">
            </form>
          </div>
        </div>
      </div>
    </div>`;

    document.getElementById("like").addEventListener('click', function() { likeLoad }, false);

    const detailList = document.getElementById(`principal`).innerHTML = templateDetailBeers;
    return `
      <div class="row row-cols-1 row-cols-md-2">
        ${detailList}
      </div>`;

  });
}

function commentSend(id) {
  const commentText = document.getElementById("commenttext");
  const quoteInput = document.getElementById("commentform");
  console.log(commentText)
  console.log(id)

  quoteInput.addEventListener('submit', async evt => {
      evt.preventDefault();
  });

  axios.post(URL + `/${id}/comment`, { comment : commentText })

  .then(function(response) {
      const beers = response.data.beer;
      const comment = beers.comments.map(result => {
          const dateHour = result.dateComment.slice(11,19);
          const dateDay = result.dateComment.slice(0,10);
              if (result) {
                  return `
                  <p class="card-text">${result.comment}</p>
                  <p class="card-text">${dateHour} ${dateDay}</p>`
              }
      });

      document.getElementById(`commentzone`).innerHTML = comment.join('');
  })
  .catch(function(err) {
      console.log(err.message);
      throw err;
  })
}
