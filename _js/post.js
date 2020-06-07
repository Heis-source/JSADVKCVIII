function likeLoad (value) {

    axios.post(URL + `/${value}/like`, { }, config)

    .then(function(response) {
        if (response) {
            const beers = response.data.beer;
            document.getElementById("like-text").innerHTML = beers.likes + `<a href='#/' onclick="likeLoad(${beers.beerId})"><i class="fas fa-thumbs-up rounded float-right"></i></a></p>`;
        }
    })
    .catch(function(err) {
    console.log(err);
    })
    .then(function() {

    });
};

function commentLoad (value) {

    const commentText = document.getElementById("commenttext").value;
    const quoteInput = document.getElementById("commentform");

    quoteInput.addEventListener('submit', async evt => {
    evt.preventDefault();
    });

    axios.post(URL + `/${value}/comment`, { comment : commentText }, config)
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
        console.log(err);
    })
    .then(function() {

    });
};