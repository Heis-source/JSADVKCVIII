export const lStorage = () => {

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('input.search');

  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    if (searchInput.validity.valid) {
      return localStorage.setItem('last-search', searchInput.value);
    } else {
      return localStorage.clear();
    }
  })
}

export const commentLoad = (array) => {
  const commentLoader = array.map( (i) => {
    return `
      <p class="card-text">${i.comment}</p>
      <p class="card-text">${i.dateComment}</p>`
  }).join(' ');

  return commentLoader;
}