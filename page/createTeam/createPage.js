import { createTemplate } from "./createPageTemplate.js";

const form = {};
let _router = undefined;
let _authService = undefined;
let _context = undefined;

async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const logoUrl = formData.get("logoUrl").trim();
    const description = formData.get("description").trim();

    if(name.length < 4) {
        form.reset();
        form.error = true;
    }

    if(logoUrl.length === 0 || logoUrl === '') {
        form.reset();
        form.error = true;
    }

    if(description.length < 10){
        form.reset();
        form.error = true;
    }

    const team = {
        name,
        logoUrl,
        description
    };

    await _authService.createTeam(team);

    const templateResult = createTemplate(form);
    _context.renderView(templateResult);
    _router.redirect("/browse-teams");
}

function getView(context) {
    _context = context;
    _router = context.page;
    _authService = context.teams;

    form.submitHandler = submitHandler;
    const templateResult = createTemplate(form);
    context.renderView(templateResult);
}
export default {
    getView
}