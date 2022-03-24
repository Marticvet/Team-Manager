import { html } from "lit-html";

export const modalTemplate = () => html` <div
    class="overlay"
    style="display: none;"
>
    <div class="modal">
        <p>Overlay message</p>
        <a href="#" class="action">Action</a>
    </div>
</div>`;
