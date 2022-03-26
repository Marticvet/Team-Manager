import litRenderer from "./litRenderer/litRenderer.js";
import page from "./node_modules/page/page.mjs";
import browseTeamsPage from "./page/browse-teams/browseTeamsPage.js";
import createPage from "./page/createTeam/createPage.js";
import editPage from "./page/editTeam/editPage.js";
import homePage from "./page/home/homePage.js";
import loginPage from "./page/login/loginPage.js";
import myTeamsPage from "./page/my-teams/myTeamsPage.js";
import nav from "./page/nav/nav.js";
import registerPage from "./page/register/registerPage.js";
import teamDetailsPage from "./page/team-details/teamDetailsPage.js";
import authService from "./services/authService.js";
import browseTeamsService from "./services/browseTeamsService.js";
import membersService from "./services/membersService.js";

const navbar = document.getElementById("titlebar");
const application = document.getElementById("application");

page("/", "/home");
page("/index.html", "/home");

page("*", decorateUser);
page("*", litRenderer.decoreteContext);
litRenderer.initialize(navbar, application, modal);

page("*", nav.getView);
page("/home", homePage.getView);
page("/register", registerPage.getView);
page('/login', loginPage.getView);
page('/browse-teams', browseTeamsPage.getView);
page('/create-team', createPage.getView);
page('/details/:id', teamDetailsPage.getView);
page('/edit-team/:id', editPage.getView);
page('/my-teams', myTeamsPage.getView);

page.start();

function decorateUser(context, next) {
    const user = authService;
    const members = membersService;
    const teams = browseTeamsService;
    context.user = user;
    context.members = members;
    context.teams = teams;
    next();
}
