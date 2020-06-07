import { templateBeers, showDetails } from './api.js';


/* get value saved in local storage, default is lStorage */
//const { getItem } = storage(STORAGE_TYPE);

page("/", () => {
    templateBeers();
});

page("/details/:id", (ctx) => {
    const { params: {id} } = ctx;
    showDetails(id);
});
page();