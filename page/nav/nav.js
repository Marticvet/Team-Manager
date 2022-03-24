import { navTemplate } from "./navTemplate.js";

const modal = {};
let _authService = undefined;
let _router = undefined;

async function logoutHandler() {
    await _authService.logout();
    _router.redirect("/home");
}

function getView(context, next) {
    _router = context.page;
    _authService = context.user;
    modal.user = context.user;
    modal.logout = logoutHandler;
    const templateResult = navTemplate(modal);
    context.renderNav(templateResult);
    next();
}

export default {
    getView,
};
