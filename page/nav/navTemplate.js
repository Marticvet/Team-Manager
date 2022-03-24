import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (modal) => html`<a href="/home" class="site-logo"
        >Team Manager</a
    >
    <nav>
        <a href="/browse-teams" class="action">Browse Teams</a>
        ${modal.user.isLoggedIn()
            ? html`
                  <a href="/my-teams" class="action">My Teams</a>
                  <a href="javascript:void(0);" @click=${modal.logout} class="action">Logout</a>
              `
            : html` <a href="/login" class="action">Login</a>
                    <a href="/register" class="action">Register</a> `}
    </nav>`;
