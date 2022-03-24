import page from "../node_modules/page/page.mjs";

const BASE_DATA_URL = "http://localhost:3030/users";

function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}

function setUserToken(token) {
    localStorage.setItem("token", token);
}

function setUserId(userId) {
    localStorage.setItem("userId", userId);
}

function setUsername(username) {
    localStorage.setItem("username", username);
}

function getUsername() {
    return localStorage.getItem("username");
}

function getUserToken() {
    return localStorage.getItem("token");
}

function getUserId() {
    return localStorage.getItem("userId");
}

async function loginUser(user) {
    try {
        const loginUser = await fetch(`${BASE_DATA_URL}/login`, {
            headers: { "Content-Type": "application/json" },
            method: "Post",
            body: JSON.stringify(user),
        });

        if (!loginUser.ok) {
            alert("Email or password is invalid!");
            page.redirect("login");
            return;
        }
        const loggedInUser = await loginUser.json();
        setUserToken(loggedInUser.accessToken);
        setUserId(loggedInUser._id);
        setUsername(loggedInUser.username);
    } catch (err) {
        throw new Error(err);
    }
}

async function registerUser(user) {
    try {
        const createUser = await fetch(`${BASE_DATA_URL}/register`, {
            headers: { "Content-Type": "application/json" },
            method: "Post",
            body: JSON.stringify(user),
        });

        if (!createUser.ok) {
            alert("A user with the same email already exists");
            page.redirect("register");
            return;
        }

        const newUser = await createUser.json();
        setUserToken(newUser.accessToken);
        setUserId(newUser._id);
        setUsername(newUser.username);
    } catch (err) {
        throw new Error(err);
    }
}

async function logout() {
    try {
        await fetch(`${BASE_DATA_URL}/logout`, {
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": getUserToken(),
            },
            method: "Get",
        });

        localStorage.clear();
    } catch (err) {
        throw new Error(err);
    }
}

export default {
    isLoggedIn,
    registerUser,
    logout,
    loginUser,
    getUserId,
    setUsername,
    getUsername,
    getUserToken,
};
