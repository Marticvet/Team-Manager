import { homeTemplate } from "./homePageTemplate.js";

function getView(context){
    const user = context.user;
    const templateResult = homeTemplate(user);
    context.renderView(templateResult);
}

export default{
    getView
}