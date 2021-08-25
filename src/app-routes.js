import { withNavigationWatcher } from "./contexts/navigation";
import {
  CustomerPage,
  HomePage,
  MerchantsPage,
  TransactionPage,
  DisputePage,
  InvoicePage,
  RedeemTransactionsPage
} from "./pages";

const routes = [
  {
    path: "/customers",
    component: CustomerPage
  },
  {
    path: "/merchants",
    component: MerchantsPage
  },
  {
    path: "/home",
    component: HomePage
  },
  {
    path: "/transactions",
    component: TransactionPage
  },
  {
    path: "/disputes",
    component: DisputePage
  },
  {
    path: "/invoices",
    component: InvoicePage
  },
  {
    path: "/redeemTransactions",
    component: RedeemTransactionsPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
