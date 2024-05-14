import { AuthPage } from "./AuthControl.js";
import { LeadPage } from "./LeadPage.js";

const main = document.querySelector('main');
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
    const route = routes[location];
    while(main.firstChild){
        main.removeChild(main.firstChild)
    }
    document.title = route.title;
     route.template();
    //  const routeButton = document.querySelector(".rt")
    //  routeButton.addEventListener('click', (e) => {
    //     history.replaceState(null, document.title, window.location.href);
    //     console.log("History cleared;");
    //   });

    // const html = await fetch(route.template).then((response) => response.text());
    // // set the content of the content div to the html
    // document.body.innerHTML = html;


    // set the title of the document to the title of the route
    
    // set the description of the document to the description of the route
    // document
    //     .querySelector('meta[name="description"]')
    //     .setAttribute("content", route.description);
  };
  window.onpopstate = locationHandler;

locationHandler();
