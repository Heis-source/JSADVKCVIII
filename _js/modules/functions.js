export const commentLoad = (array) => {
    const commentLoader = array.map( (i) => {
      return `
        <p class="card-text">${i.comment}</p>
        <p class="card-text">${i.dateComment}</p>`
    }).join(' ');
  
    return commentLoader;
}