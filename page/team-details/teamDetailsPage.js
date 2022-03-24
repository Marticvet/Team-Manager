import { teamDetailsTemplate } from "./teamsTemplate.js";

const teamInfo = {};
let _userId = undefined;
let _teamId = undefined;
let _context = undefined;

async function joinTeam(event){

}

async function leaveTeam(){
    console.log(`da`);
}

async function cancelRequst(){
    console.log(`da`);
}

async function approveUser(event){
    const userId = event.target.dataset.id;

    console.log(userId);
}

async function declineUser(event){
    const userId = event.target.dataset.id;

    console.log(userId);
}

async function removeUser(event){
    const userId = await _context.user.getUserId();
    await _context.members.declineMember(userId);
}

async function getView(context) {
    _context = context;
    _teamId = context.params.id;
    teamInfo.team = await context.teams.getTeam(_teamId);
    teamInfo.isLoggedIn = await context.user.isLoggedIn();
    teamInfo.isOwner = await context.user.getUserId();
    teamInfo.username = await context.user.getUsername();
    teamInfo.members = await context.members.getMembershipsForTeamWithUser(_teamId);
    teamInfo.membersCount = teamInfo.members.length;
    teamInfo.currentUserId = context.user.getUserId();
    teamInfo.isMember = teamInfo.members.includes(teamInfo.currentUserId);
    teamInfo.handlers = {
        joinTeam,
        leaveTeam,
        cancelRequst,
        approveUser,
        declineUser,
        removeUser,
    };
    
    _userId = context.user.getUserId();
    const templateResult = teamDetailsTemplate(teamInfo);
    context.renderView(templateResult);
}

export default {
    getView
}