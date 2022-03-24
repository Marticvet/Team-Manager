import { registerTemplate } from "./registerPageTemplate.js";

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
    const rePass = formData.get("repass").trim();
    const username = formData.get("username").trim();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        form.reset();
        form.error = true;
    }

    if (password.length < 3 || password !== rePass) {
        form.reset();
        form.error = true;
    }

    if (username.length < 3) {
        form.reset();
        form.error = true;
    }

    const user = {
        email,
        password,
        username,
    };

    await _authService.registerUser(user);

    const templateResult = registerTemplate(form);
    _context.renderView(templateResult);
    _router.redirect("my-teams");
}

function getView(context) {
    _context = context;
    _router = context.page;
    _authService = context.user;

    form.submitHandler = submitHandler;
    const templateResult = registerTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
};
