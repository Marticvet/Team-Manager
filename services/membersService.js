import { encodeQuery } from "../helpers/queryEndocder.js";
import authService from "./authService.js";

const BASE_MEMBERS_URL = "http://localhost:3030/data/members";

async function getMembers() {
    try {
        const queryObj = {
            where: `status="member"`,
        };

        const query = encodeQuery(queryObj);
        const getMembers = await fetch(`${BASE_MEMBERS_URL}?${query}`);
        return await getMembers.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function getTeamMembers(teamId) {
    const getMembers = await fetch(
        `${BASE_MEMBERS_URL}?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`
    );
    return await getMembers.json();
}

async function updateMember(memberId, data) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "Put",
            body: JSON.stringify(data),
        };
        const updateRespone = await fetch(
            `${BASE_MEMBERS_URL}/${memberId}`,
            options
        );

        if (!updateRespone.ok) {
            alert("Something went wrong! Please try again.");
            return;
        }
        return await updateRespone.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function createMember(teamId) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "POST",
            body: JSON.stringify({ teamId }),
        };
        const createResponse = await fetch(BASE_MEMBERS_URL, options);

        if (!createResponse.ok) {
            alert("Something went wrong! Please try again.");
            return;
        }

        return await createResponse.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteMember(memberId) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "Delete",
        };

        const joinRequest = await fetch(
            `${BASE_MEMBERS_URL}/${memberId}`,
            options
        );

        if (!joinRequest.ok) {
            alert("Something went wrong! Please try again.");
            return;
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function getMembershipsForTeamWithUser(teamId) {
    try {
        const queryObj = {
            where: `teamId="${teamId}"`,
            load: `user=_ownerId:users`,
        };
        const query = encodeQuery(queryObj);
        const getMemberShips = await fetch(`${BASE_MEMBERS_URL}?${query}`);
        return await getMemberShips.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function getMembersForTeamWithTeamData(where) {
    const query = encodeQuery({ where });
    const getMemberShips = await fetch(`${BASE_MEMBERS_URL}?${query}`);
    return await getMemberShips.json();
}

export default {
    getMembers,
    updateMember,
    createMember,
    deleteMember,
    getMembersForTeamWithTeamData,
    getMembershipsForTeamWithUser,
    getTeamMembers,
};
