
//Time to show some comments.

export const commentLoad = (array) => {
  const commentLoader = array.map( (i) => {
    const dateHour = i.dateComment.slice(11,19);
    const dateDay = i.dateComment.slice(0,10);
    return `
      <p class="card-text">${i.comment}</p>
      <p class="card-text">${dateHour} ${dateDay}</p>`
  }).join(' ');

  return commentLoader;
}

// Working with arrays

export const arrayReader = (array) => {
  const arrayReader = array.map( (i) => {
      return `<li>${i.name}</li>`;;
  }).join(" ");

  return arrayReader;
}
