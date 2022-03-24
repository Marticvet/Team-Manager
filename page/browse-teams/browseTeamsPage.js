import { browseTeamsTemplate } from "./browseTeamsTemplate.js";

async function getView(context) {
    const user = context.user;
    const teamsInfo = {
        teams: await context.teams.getAllTeams(),
        isLoggedIn: user.isLoggedIn(),
        teamsMembersCount: {},
    };

    const teamsIds = teamsInfo.teams.map((t) => t._id);
    const teamIdsForQuery = '("' + teamsIds.join('","') + '")';
    const where = `teamId IN ${teamIdsForQuery} AND status="member"`;
    const members = await context.members.getMembersForTeamWithTeamData(where);

    for (const member of members) {
        if (teamsInfo.teamsMembersCount.hasOwnProperty(member.teamId)) {
            teamsInfo.teamsMembersCount[member.teamId]++;
        } else {
            teamsInfo.teamsMembersCount[member.teamId] = 1;
        }
    }

    const templateResult = browseTeamsTemplate(teamsInfo);
    context.renderView(templateResult);
}

export default {
    getView,
};
