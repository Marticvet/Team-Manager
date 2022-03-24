import { loginTemplate } from "./loginPageTemplate.js";

const form = {};
let _router = undefined;
let _authService = undefined;
let _context = undefined;

async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    const user = {
        email,
        password,
    };

    await _authService.loginUser(user);

    const templateResult = loginTemplate(form);
    _context.renderView(templateResult);
    _router.redirect("my-teams");
}

function getView(context) {
    _context = context;
    _router = context.page;
    _authService = context.user;

    form.submitHandler = submitHandler;
    const templateResult = loginTemplate(form);
    context.renderView(templateResult);
}
export default {
    getView,
};
