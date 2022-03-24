import { encodeQuery } from "../helpers/queryEndocder.js";
import page from "../node_modules/page/page.mjs";
import authService from "./authService.js";

const BASE_TEAM_URL = "http://localhost:3030/data/teams";

async function getAllTeams() {
    const getTeams = await fetch(BASE_TEAM_URL);
    const getResponse = await getTeams.json();
    return getResponse;
}

async function getTeam(id) {
    const getTeamResponse = await fetch(`${BASE_TEAM_URL}/${id}`);
    return await getTeamResponse.json();
}

async function getUserTeams(userId) {
    const getTeams = await fetch(
        `${BASE_TEAM_URL}/catalog?where=_ownerId%3D%22${userId}%22`
    );

    return await getTeams.json();
}

async function createTeam(team) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "POST",
            body: JSON.stringify(team),
        };
        const createdTeam = await fetch(BASE_TEAM_URL, options);

        if (!createdTeam.ok) {
            alert("Something went wrong! Please try again.");
            page.redirect("create");
            return;
        }

        await createdTeam.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function editTeam(team, id) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "Put",
            body: JSON.stringify(team),
        };
        const editedTeam = await fetch(
            `${BASE_TEAM_URL}/${id}`,
            options
        );

        const editedResult = await editedTeam.json();
        if (!editedTeam.ok) {
            alert("Something went wrong! Please try again.");
            page.redirect(`edit-team/${id}`)
            return;
        }
        return editedResult;
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteTeam(id) {
    try {
        const headers = {};
        headers["X-Authorization"] = authService.getUserToken();

        const options = {
            headers,
            method: "Delete",
        };
        const deletedTeam = await fetch(
            `${BASE_TEAM_URL}/${id}`,
            options
        );

        if (!deletedTeam.ok) {
            page.redirect("/home");
            return;
        }
    } catch (err) {
        throw new Error(err);
    }
}

export default{
    getTeam,
    getUserTeams,
    editTeam,
    getAllTeams,
    createTeam,
    deleteTeam,
}