import { AuthPage } from "./AuthControl.js";
import { LeadPage } from "./LeadPage.js";
import { ManagerOrderPage } from "./OrderManager.js";
import { AnalyticsPage } from "./Analytics.js";
import { DepotOrderPage } from "./OrderDepot.js";
import { DepotPage } from "./Depot.js";
import { DocumentsPage } from "./Documents.js";

const main = document.querySelector('main');
const routes = {
   
    "/": {
        template: () =>AuthPage(),
        title: "Вхід",
    },
    "/lead": {
        template: () => LeadPage(),
        title: "Ліди",
    },
    "/order": {
        template: () => ManagerOrderPage(),
        title: "Замовлення",
    },
    "/analytics": {
        template: () => AnalyticsPage(),
        title: "Аналітика",
    },
    "/orderDepot": {
        template: () => DepotOrderPage(),
        title: "Замовлення",
    },
    "/depot": {
        template: () => DepotPage(),
        title: "Склад",
    },
    "/documents": {
        template: () => DocumentsPage(),
        title: "Документи",
    },
  };
  const locationHandler = () => {
    
    const location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    
    // get the route object from the urlRoutes object
    const route = routes[location];
    route.template();
    document.title = route.title;
    // while(main.firstChild){
    //     main.removeChild(main.firstChild)
    // }
    
  };
  window.onpopstate = locationHandler;

locationHandler();
