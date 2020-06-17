import { URL, API_KEY } from "./constants/beerbliotekAPI.js" ;
import { commentLoad } from './functions.js';

const api = () => {

    const searchAPIUrlEndpoint = `${URL}?search`;
    const beersAPIUrlEndpoint = `${URL}`;

    return {
        getBeers: async search => {
            try {
                const config = {
                    method: 'get',
                    url: search ? `${searchAPIUrlEndpoint}=${search}` : beersAPIUrlEndpoint,
                    headers: { 'X-API-KEY': API_KEY }
                };
                const resp = await axios(config);

                const dataBeers = await resp.data.beers;

                if (dataBeers.length >= 1 ){
                    return dataBeers;
                } else {
                    return false;
                }

            } catch (err) {
                console.log(err.message);
                throw err;
            }
        },

        getBeerDetail: async id => {
            try{
                const config = {
                    method: 'get',
                    url: `${URL}/${id}`,
                    headers: { 'X-API-KEY': API_KEY }
                };
                const resp = await axios(config);

                const detailBeer = await resp.data.beer;
                return detailBeer;

            } catch(err) {
                console.log(err.message);
                throw err;
            }
        },

        likeLoad: async id => {
            try {
                const config = {
                    method: 'post',
                    url: `${URL}/${id}/like`,
                    headers: { 'X-API-KEY': API_KEY }
                }
                const resp = await axios(config);
                
                if (resp) {
                    const beers = resp.data.beer;
                    document.getElementById("like-text").innerHTML = beers.likes;
                }

            } catch(err) {
                console.log(err.message);
                throw err;
            }
        },

        createComment: async (id, text) => {
            try{
                const config = {
                    method: "post",
                    url: `${URL}/${id}/comment`,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': API_KEY
                    },
                    data: {
                        comment : text
                    }
                };

                const resp = await axios(config);

                if (resp) {
                    const commentBeer = resp.data.beer.comments;
                    document.getElementById(`commentzone`).innerHTML = commentLoad(commentBeer)
                }

            } catch(err) {
                console.log(err.message);
                throw err;
            }
        },
    }
}

export default api;