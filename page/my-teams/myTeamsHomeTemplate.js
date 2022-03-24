import { ifDefined } from "../../node_modules/lit-html/directives/if-defined.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

export const myTeamsTemplate = (teamsInfo) => html`<section id="my-teams">

<article class="pad-med">
    <h1>My Teams</h1>
</article>

<article class=${ifDefined(teamsInfo.teams.length === 0 ? "layout narrow" : "hidden")}>
    <div class="pad-med">
        <p>You are not a member of any team yet.</p>
        <p><a href="#">Browse all teams</a> to join one, or use the button bellow to cerate your own
            team.</p>
    </div>

    <div class="pad-small"><a href="/create-team" class="action cta">Create Team</a></div>

</article>
    ${teamsInfo.teams.map(t => teamTemplate(t, teamsInfo.teamsMembersCount[t._id]))}
</section>`;



const teamTemplate = (team, count) => html`    
<article class="layout" id=${team._id}>
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${count} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`
