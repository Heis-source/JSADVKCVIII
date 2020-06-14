import { templateBeers, showDetails } from './api.js';
import { lStorage } from './navbar.js';

page("/", () => {
    templateBeers(localStorage.getItem('last-search'));
});
page("/details/:id", (ctx) => {
    const { params: {id} } = ctx;
    showDetails(id);
});
page();