import { html } from "../../node_modules/lit-html/lit-html.js";

export const teamDetailsTemplate = (teamInfo) => html`<section id="team-home">

<article class="layout">
    <img src=${teamInfo.team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${teamInfo.team.name}</h2>
        <p>${teamInfo.team.description}</p>
        <span class="details">${teamInfo.membersCount} Members</span>
        <div>
            ${teamInfo.isLoggedIn === true && teamInfo.team._ownerId !== teamInfo.isOwner
            ? html`
            ${teamInfo.isMember === true 
                ? html`<a href="javascript:void(0)" @click=${teamInfo.handlers.leaveTeam} class="action invert">Leave team</a>`
                : html`<a href="javascript:void(0)" @click=${teamInfo.handlers.joinTeam} class="action">Join team</a>`}
            
            Membership pending. <a href="javascript:void(0)" @click=${teamInfo.handlers.cancelRequst}>Cancel request</a>`
            : html`${teamInfo.team._ownerId === teamInfo.isOwner ? html`<a href="/edit-team/${teamInfo.team._id}" class="action">Edit team</a>` 
            : ''}`}
        </div>
    </div>
    <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
            ${teamInfo.team._ownerId == teamInfo.isOwner ? html` <li>My username: ${teamInfo.username}</li>` : ""}
            ${teamMembers(teamInfo)}
        </ul>
    </div>
    <div  class=${teamInfo.isLoggedIn == false ? "hidden" : "pad-large"}>
        <h3>Membership Requests</h3>
        <ul class="tm-members">
                ${teamInfo.members.map(members => members.status !== "member" ?  membershipRequestTemplate(members, teamInfo) :'')}
        </ul>
    </div>
</article>
</section>`;

const membershipRequestTemplate = (member, teamInfo) => html`
            <li>${member.user.username}<a href="javascript:void(0)" @click=${teamInfo.handlers.approveUser} class="tm-control action">Approve</a><a href="javascript:void(0)"
                    @click=${teamInfo.handlers.declineUser} class="tm-control action">Decline</a></li>`

const teamMembers = (teamInfo) =>
 html`${teamInfo.members.map((members) => membersTemplate(members, teamInfo))}`;

const membersTemplate = (members, teamInfo) => html`
 
<li>${`${members.status === "member" && members.user.username !== teamInfo.username ?  members.user.username : ''}`}${
    teamInfo.team._ownerId === teamInfo.isOwner && teamInfo.team._ownerId !== members.user._id
    ? html`<a href="javascript:void(0)" @click=${teamInfo.handlers.removeUser} data-id=${members._id} class="tm-control action">Remove from team</a>` 
    : ''}
</li>`;


