import { AuthPage } from "./AuthControl.js";
import { LeadPage } from "./LeadPage.js";



const routes = {
   
    "/": {
        template: () =>AuthPage(),
        title: "Вхід",
        description: "Сторінка автентифікації",
    },
    "/lead": {
        template: () => LeadPage(),
        title: "Ліди",
        description: "Сторінка лідів",
    },
    "/contact": {
        template: "templates/contact.html",
        title: "Contact Us",
        description: "This is the contact page",
    },
  };
  const locationHandler = async () => {
    const location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    // get the route object from the urlRoutes object
    const route = routes[location] || routes["404"];
    // get the html from the template

     route.template();
    

    // const html = await fetch(route.template).then((response) => response.text());
    // // set the content of the content div to the html
    // document.body.innerHTML = html;


    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    // document
    //     .querySelector('meta[name="description"]')
    //     .setAttribute("content", route.description);
  };
  window.onpopstate = locationHandler;
// window.addEventListener("DOMContentLoaded",(e)=>{
//     locationHandler();
// })
window.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches(".rt")) {
        return;
    }
    e.preventDefault();
    window.history.pushState({},"",e.target.href)
    locationHandler();
  });
locationHandler();
