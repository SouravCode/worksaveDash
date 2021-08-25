import { withNavigationWatcher } from "./contexts/navigation";
import {
  MerchantDisputePage,
  MerchantHomePage,
  MerchantInvoicePage,
  MerchantOfferPage,
  MerchantTransactionPage,
  MerchantProfilePage
} from "./pages";

const routes = [
  {
    path: "/merchanthome",
    component: MerchantHomePage
  },
  {
    path: "/merchantdispute",
    component: MerchantDisputePage
  },
  {
    path: "/merchantinvoice",
    component: MerchantInvoicePage
  },
  {
    path: "/merchantoffer",
    component: MerchantOfferPage
  },
  {
    path: "/merchanttransaction",
    component: MerchantTransactionPage
  },
  {
    path: "/profile",
    component: MerchantProfilePage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
