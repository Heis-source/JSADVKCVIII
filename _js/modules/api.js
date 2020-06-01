import { URL, API_KEY } from "./constants/beerbliotekAPI.js" ;

const api = () => {

    const searchAPIUrlEndpoint = `${URL}?search`;
    const beersAPIUrlEndpoint = `${URL}?limit=10`;

    return {
        getBeers: async search => {
            try {
                const config = {
                    method: 'get',
                    url: search ? `${searchAPIUrlEndpoint}=${search}&limit=10` : beersAPIUrlEndpoint,
                    headers: { 'X-API-KEY': API_KEY }
                };
                const resp = await axios(config);

                if(resp.config.validateStatus == false){
                   new Error(`Error retrieving beers. Code error: ${resp.status}`);
                }

                const dataBeers = await resp.data.beers;

                if( dataBeers.length >= 1 ){
                    return dataBeers;
                }else{
                    return false;
                }

            } catch(err) {
                console.log(err.message);
                throw err;
            }
        },

        getBeerDetail: async id => {
            try{
                const config = {
                    method: 'get',
                    url: `${apiURL}${id}`,
                    headers: { 'X-API-KEY': API_KEY }
                };
                const resp = await axios(config);

                if(resp.config.validateStatus == false){
                    new Error(`Error retrieving beers. Code error: ${resp.status}`);
                }

                const detailBeer = await resp.data.beer;
                return detailBeer;

            }catch(err){
                console.log(err.message);
                throw err;
            }
        },

        /*create comment for Beer*/
        createComment: async (id, text) => {
            try{

                const config = {
                    method: "post",
                    url: `${apiURL}${id}/comment`,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': API_KEY
                    },
                    data: {
                        comment : text
                    }
                };

                const resp = await axios(config);

                /*if code distintc 200 or 300:*/
                if(resp.config.validateStatus == false){
                    new Error(`Error retrieving beers. Code error: ${resp.status}`);
                }

                return resp;

            }catch(err){
                console.log(err.message);
                throw err;
            }
        },

        /*create like in detail Beer*/
        createLike: async id => {
            try{
                const config = {
                    method: "post",
                    url: `${apiURL}${id}/like`,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': API_KEY
                    }
                };

                const resp = await axios(config);

                /*if code distintc 200 or 300:*/
                if(resp.config.validateStatus == false){
                    new Error(`Error retrieving beers. Code error: ${resp.status}`);
                }

                const likes = resp.data.beer.likes;

                return likes;

            }catch(err){
                console.log(err.message);
                throw err;
            }
        }
    };
};

export default api;