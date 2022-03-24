import { encodeQuery } from "../helpers/queryEndocder.js";
import authService from "./authService.js";
import page from "../node_modules/page/page.mjs";

const BASE_MEMBERS_URL = "http://localhost:3030/data/members";

async function getMembers() {
    const queryObj = {
        where: `status="member"`,
    };

    const query = encodeQuery(queryObj);
    const getMembers = await fetch(`${BASE_MEMBERS_URL}?${query}`);
    return await getMembers.json();
}

async function becomeMember(teamId){
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "POST",
            body: JSON.stringify(teamId),
        };
        const joinRequest = await fetch(BASE_MEMBERS_URL, options);

        console.log(joinRequest);

        if (!joinRequest.ok) {
            alert("Something went wrong! Please try again.");
            page.redirect(`details/${teamId}`);
            return;
        }

        return await joinRequest.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function approveMember(teamId){
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "POST",
            body: JSON.stringify(teamId),
        };
        const joinRequest = await fetch(BASE_MEMBERS_URL, options);

        console.log(joinRequest);

        if (!joinRequest.ok) {
            alert("Something went wrong! Please try again.");
            page.redirect(`details/${teamId}`);
            return;
        }

        return await joinRequest.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function declineMember(userId){
    try {
        console.log(userId);
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "Delete",
  
        };
        const joinRequest = await fetch(`${BASE_MEMBERS_URL}/${userId}`, options);

        if (!joinRequest.ok) {
            alert("Something went wrong! Please try again.");
            return;
        }

    } catch (err) {
        throw new Error(err);
    }
}

async function getMembershipsForTeamWithUser(teamId){
    const queryObj = {
        where: `teamId="${teamId}"`,
        load: `user=_ownerId:users`
    }
    const query = encodeQuery(queryObj);
    const getMemberShips = await fetch(`${BASE_MEMBERS_URL}?${query}`);
    return await getMemberShips.json();
}


async function getMembersForTeamWithTeamData(where){
    const query = encodeQuery({where});
    const getMemberShips = await fetch(`${BASE_MEMBERS_URL}?${query}`);
    return await getMemberShips.json();
}

async function getALlMemberTeams(userId){
    
// /data/members?where=_ownerId%3D%22{userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams
}

export default {
    getMembers,
    becomeMember,
    approveMember,
    declineMember,
    getMembersForTeamWithTeamData,
    getMembershipsForTeamWithUser,
    getALlMemberTeams
};
