import { templateBeers } from "./api.js"

function lStorage() {

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('input.search');

    searchForm.addEventListener('submit', evt => {
        evt.preventDefault();
        if (searchInput.validity.valid) {
          // Pintar shows con el filtro!
          firstLoad(searchInput.value);
          // almacenar en localstorage o cookie storage
          localStorage.setItem('last-search', searchInput.value);
        }
      });

      if (localStorage.getItem('last-search')) {
        templateBeers(localStorage.getItem('last-search'));
      } else {
        templateBeers();
      }
}