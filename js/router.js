import { AuthPage } from "./AuthControl.js";
import { LeadPage } from "./LeadPage.js";
import { ManagerOrderPage } from "./OrderManager.js";
import { AnalyticsPage } from "./Analytics.js";
import { DepotOrderPage } from "./OrderDepot.js";
import { DepotPage } from "./Depot.js";
import { DocumentsPage } from "./Documents.js";
import { showAlert } from "./lib.js";


function changeURL(route) {    
    if(route.role!= localStorage.role)
        {
            window.history.go(-1);
            showAlert('Виникла помилка',3000,'black')
            return;
        }
    $('main').fadeOut(50);
    setTimeout(() => {
        route.template();
        $('main').fadeIn(150);
    }, 50);
}

const main = document.querySelector('main');
const routes = {
    "/auth": {
        template: () => AuthPage(),
        title: "Вхід",
    },
    "/lead": {
        template: () => LeadPage(),
        title: "Ліди",
        role: 'manager',
    },
    "/order": {
        template: () => ManagerOrderPage(),
        title: "Замовлення",
        role: 'manager',
    },
    "/analytics": {
        template: () => AnalyticsPage(),
        title: "Аналітика",
        role: 'manager',
    },
    "/orderDepot": {
        template: () => DepotOrderPage(),
        title: "Замовлення",
        role: 'depotworker',
    },
    "/depot": {
        template: () => DepotPage(),
        title: "Склад",
        role: 'depotworker',
    },
    "/documents": {
        template: () => DocumentsPage(),
        title: "Документи",
        role: 'depotworker',
    },
};

const locationHandler = () => {
    let location = window.location.pathname; // get the url path

    // if the path length is 0, set it to primary page route
    if (location === "/") {
        window.history.replaceState(null, document.title, '');
        location = "/auth";
        if (localStorage.role == 'depotworker') {
            const route = routes["/orderDepot"];
            changeURL(route)
            document.title = route.title;
            window.location.href = "/orderDepot"
            return;
        }
        if (localStorage.role == 'manager') {
            const route = routes["/lead"];
            changeURL(route)
            document.title = route.title;
            window.location.href = "/lead"
            return;
        }
    }

    // Replace '/auth' in the history with null
    if (location.includes("/auth")) {
        window.history.replaceState(null, document.title, location.replace("/auth", ""));
    }

    // get the route object from the routes object
    const route = routes[location] || routes["/"]; // fallback to primary page route

    changeURL(route)

    document.title = route.title;
};

window.onpopstate = locationHandler;

// Initial call to locationHandler
locationHandler();
