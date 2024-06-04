import { AuthPage } from "./AuthControl.js";
import { LeadPage } from "./LeadPage.js";
import { ManagerOrderPage } from "./OrderManager.js";
import { AnalyticsPage } from "./Analytics.js";
import { DepotOrderPage } from "./OrderDepot.js";
import { DepotPage } from "./Depot.js";
import { DocumentsPage } from "./Documents.js";

const main = document.querySelector('main');
const routes = {
    "/auth": {
        template: () => AuthPage(),
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
    let location = window.location.pathname; // get the url path

    // if the path length is 0, set it to primary page route
    if (location === "/") {
        window.history.replaceState(null, document.title, '');
        location = "/auth";
    }

    // Replace '/auth' in the history with null
    if (location.includes("/auth")) {
        window.history.replaceState(null, document.title, location.replace("/auth", ""));
    }

    // get the route object from the routes object
    const route = routes[location] || routes["/"]; // fallback to primary page route

    $('main').fadeOut(50);

    setTimeout(() => {
        route.template();
        $('main').fadeIn(150);
    }, 50);

    document.title = route.title;
};

window.onpopstate = locationHandler;

// Initial call to locationHandler
locationHandler();
