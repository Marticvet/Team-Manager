import { html } from "../../node_modules/lit-html/lit-html.js";
import { ifDefined } from "../../node_modules/lit-html/directives/if-defined.js";

export const editTempalte = (form) => html`           
<section id="edit">
   <article class="narrow">
       <header class="pad-med">
           <h1>Edit Team</h1>
       </header>
       <form @submit=${form.submitHandler} id="create-form" class="main-form pad-large">
           <div class=${ifDefined(form.error === true ? "error" : 'hidden')}>Error message.</div>
           <label>Team name: <input type="text" name="name" .value=${form.team.name}></label>
           <label>Logo URL: <input type="text" name="logoUrl" .value=${form.team.logoUrl}></label>
           <label>Description: <textarea name="description" .value=${form.team.description}></textarea></label>
           <input class="action cta" type="submit" value="Save Changes">
       </form>
   </article>
</section>`;