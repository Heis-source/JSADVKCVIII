import { templateBeers, showDetails } from './renders.js';
import lStorage from './modules/storage.js';

lStorage();
window.onload = window.localStorage.clear();

page("/", () => {
    templateBeers(localStorage.getItem('last-search'));
});
page("/details/:id", (ctx) => {
    const { params: {id} } = ctx;
    showDetails(id);
});
page();
