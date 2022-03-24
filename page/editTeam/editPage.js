import { editTempalte } from "./editPageTemplate.js";

const form = {};
let _router = undefined;
let _authService = undefined;
let _context = undefined;
let _id = undefined;

async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const logoUrl = formData.get("logoUrl").trim();
    const description = formData.get("description").trim();

    if (name.length < 4) {
        form.reset();
        form.error = true;
    }

    if (logoUrl.length === 0 || logoUrl === "") {
        form.reset();
        form.error = true;
    }

    if (description.length < 10) {
        form.reset();
        form.error = true;
    }

    const team = {
        name,
        logoUrl,
        description
    };

    await _authService.editTeam(team, _id);
    form.team = team;

    const templateResult = editTempalte(form);
    _context.renderView(templateResult);
    _router.redirect(`details/${_id}`);
}

async function getView(context) {
    _context = context;
    _router = context.page;
    _authService = context.teams;
    _id = context.params.id;
    const team = await context.teams.getTeam(_id);

    form.submitHandler = submitHandler;
    form.team = team;
    const templateResult = editTempalte(form);
    context.renderView(templateResult);
}
export default {
    getView,
};
