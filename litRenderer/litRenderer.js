import {render} from './../node_modules/lit-html/lit-html.js';

let navbarElement = undefined;
let appElement = undefined;
let modalElement = undefined;

function initialize(navbarDomElement, appDomElement, modalDomElement) {
    navbarElement = navbarDomElement
    appElement = appDomElement;
    modalElement = modalDomElement;
}

function renderNav(templateResult){
    render(templateResult, navbarElement);
}

function renderView(templateResult){
    render(templateResult, appElement);
}


export function decoreteContext(context, next){
    context.renderNav = renderNav;
    context.renderView = renderView;
    next();
}


export default {
    initialize,
    renderNav,
    renderView,
    decoreteContext,
}