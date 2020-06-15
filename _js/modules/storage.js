import { templateBeers } from '../renders.js'

function lStorage() {

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('input.search');

  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    if (searchInput.validity.valid) {

      localStorage.setItem('last-search', searchInput.value);
      const lStore = localStorage.getItem('last-search');

      if (lStore.indexOf("/") == 2) {
        templateBeers();
      } else if (lStore.indexOf("/") == -1) {
        templateBeers(lStore);
      }

    } else {
      localStorage.clear();
      templateBeers();
    }
  })
} 

export default lStorage;