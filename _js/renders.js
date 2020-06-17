import api from './modules/api.js';
import { commentLoad, arrayReader } from './modules/functions.js';

const { getBeers, getBeerDetail, likeLoad, createComment } = api();

// Like sum

const likeBeer = id => {
  const buttonLike = document.querySelector("#btn-like");

  buttonLike.addEventListener("click", async (evt) => {
    evt.preventDefault();
    await likeLoad(id);
  })
}

//Save comments

const sendComment = id => {
  const sendCommentForm = document.getElementById("commentform");

  if (sendCommentForm) {
    sendCommentForm.addEventListener("submit", async (evt) => {
      const commentText = document.getElementById("form-textarea").value;
      evt.preventDefault();
      await createComment(id, commentText);
    })
  }
}


// Rendering beers and front filtering

export const templateBeers = async value => {

  let control = 0;
  const filtered = [];
  const lStore = localStorage.getItem("last-search");
  
  getBeers(value).then(data => {
    const dataBeersNoFilter = data.map(beer => {
      if (beer.firstBrewed === lStore && control <= 9) {
        filtered.push(beer);
        control++;
      } else if (value && control <= 9) {
        filtered.push(beer);
        control++;
      } else if (!value && lStore === null && control <= 9) {
        filtered.push(beer);
        control++;
      }
    })

    const dataBeers = filtered.map(beer => {
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


// Rendering Details

export const showDetails = async id => {
  getBeerDetail(id).then(beer => {

    const hopsBeer = beer.ingredients.hops;
    const maltBeer = beer.ingredients.malt;
    const yeastBeer = beer.ingredients.yeast;
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
              <p class="card-text"><strong>Likes:</strong> <span id="like-text">${beer.likes}</span><a href='#' id="btn-like"><i class="fas fa-thumbs-up rounded float-right"></i></a></p>
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
                    <li>${yeastBeer}</li>
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
            <form id="commentform" novalidate>
              <h5>New post</h5>
              <textarea class="form-control" id="form-textarea" placeholder="Feedback!"></textarea>
              <input type="submit" class="btn btn-primary controlbutton">
            </form>
          </div>
        </div>
      </div>
    </div>`;

    const detailList = document.getElementById(`principal`).innerHTML = templateDetailBeers;

    return `
      ${likeBeer(id)}
      ${sendComment(id)}
      <div class="row row-cols-1 row-cols-md-2">
        ${detailList}
      </div>`;
  })
}
