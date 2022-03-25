import { teamDetailsTemplate } from "./teamsTemplate.js";

const teamInfo = {};
let _ownerId = undefined;
let _userId = undefined;
let _teamId = undefined;
let _context = undefined;
let isTeamMember = false;

async function joinTeam(){
    const getTeamMembers = await _context.members.getTeamMembers(_teamId);
    const isMember = 
        getTeamMembers.filter(team => team.status !== 'member' || 
            team.status !== 'pendinding' && 
            team._ownerId.includes(teamInfo.currentUserId)).length === 0;
    await _context.members.createMember(_teamId);
    teamDetailsTemplate(teamInfo, isMember, isTeamMember ? undefined : false);
    _context.page.redirect(`details/${_teamId}`);
}

async function leaveTeam(){
    const getTeamMembers = await _context.members.getTeamMembers(_teamId);
    const memberId = getTeamMembers
        .filter(team => team.status === 'member' && 
            team._ownerId.includes(teamInfo.currentUserId))[0]._id;
    await _context.members.deleteMember(memberId, _ownerId);
    _context.page.redirect(`details/${_teamId}`);
}


async function cancelRequst(){
    const getTeamMembers = await _context.members.getTeamMembers(_ownerId);
    const isMember = getTeamMembers.filter(team =>  team.status === 'pendinding' && team._ownerId.includes(teamInfo.currentUserId));
    const memberId = teamInfo.members.filter(m => m._ownerId === _userId).map(m => m._id).join(' ');
    await _context.members.deleteMember(memberId,  _ownerId);
    teamDetailsTemplate(teamInfo, isMember, isTeamMember);
    _context.page.redirect(`details/${_teamId}`);
}

async function approveUser(event){
    const memberId = event.target.dataset.memberId;
    await _context.members.updateMember(memberId, {status: 'member'});
    _context.page.redirect(`details/${_teamId}`);
}

async function declineUser(event){
    const memberId = event.target.dataset.memberId;
    await _context.members.deleteMember(memberId, _ownerId);
    _context.page.redirect(`details/${_teamId}`);
}

async function removeUser(event){
    const memberId = event.target.dataset.id;
    await _context.members.deleteMember(memberId, _ownerId);
    _context.page.redirect(`details/${_teamId}`);
}

async function getView(context) {
    _context = context;
    _teamId = context.params.id;
    teamInfo.team = await context.teams.getTeam(_teamId);
    teamInfo.isLoggedIn = await context.user.isLoggedIn();
    teamInfo.isOwner = await context.user.getUserId();
    teamInfo.username = await context.user.getUsername();
    teamInfo.members = await context.members.getMembershipsForTeamWithUser(_teamId);
    teamInfo.membersCount = teamInfo.members.filter(members => members.status === 'member').length;
    teamInfo.currentUserId = context.user.getUserId();
    teamInfo.handlers = {
        joinTeam,
        leaveTeam,
        cancelRequst,
        approveUser,
        declineUser,
        removeUser,
    };

    const getTeamMembers = await _context.members.getTeamMembers(_teamId);
    const isInTeam = getTeamMembers.filter(team => team._ownerId.includes(teamInfo.currentUserId)).length > 0;
    isTeamMember = teamInfo.members.filter(member => member._ownerId === teamInfo.currentUserId)[0];

    _userId = context.user.getUserId();
    _ownerId = teamInfo.team._ownerId;
    const templateResult = teamDetailsTemplate(teamInfo, isInTeam, isTeamMember);
    context.renderView(templateResult);
}

export default {
    getView
}