import { ifDefined } from "../../node_modules/lit-html/directives/if-defined.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

export const browseTeamsTemplate = (teamsInfo) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    <article class=${ifDefined(teamsInfo.isLoggedIn ? "layout narrow" : 'hidden')}>
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
