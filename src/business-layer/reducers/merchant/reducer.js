import { cloneDeep } from "lodash";
import { REDUCER_ID } from "./_meta";
import * as t from "./actions/action-types";
import { Merchant } from "../../domains";

export const INITIAL_STATE = {
  merchant: null,
  merchants: [],
  transactions: [],
  invoices: [],
  allInvoices: [],
  redeemTransactions: [],
  isMerchantLoaded: false,
  isMerchantLoading: false,
  isCreating: false,
  isLoaded: false,
  isLoading: false,
  isCreatingLocation: false,
  isSyncLocation: false,
  isSyncMerchant: false,
  isUpdatingMerchant: false,
  isCreatingContact: false,
  isUpdatingContact: false,
  isCreatingLocationOffer: false,
  isUpdatingLocationOffer: false,
  isCreatingProduct: false,
  isUpdatingProduct: false,
  isCreatingDispute: false,
  isCreatingAccountDetails: false,
  isUpdatingInvoice: false,
  isUpdatingAccount: false,
  isUpdatingLocationDetails: false,
  isCreatingLocationCuisine: false,
  isUpdatingLocationCuisine: false,
  isUpdatingRedeemTransactions: false,
  isApproveMerchant: false
};

export function isolateLocalState(globalState) {
  return globalState[REDUCER_ID];
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.CREATE_MERCHANT_PENDING:
      return {
        ...state,
        isCreating: true
      };

    case t.CREATE_MERCHANT_SUCCESS:
      const createdMerchant = action.payload.data;

      const updatedMerchants = cloneDeep(state.merchants);
      updatedMerchants.unshift({ ...createdMerchant });

      return {
        ...state,
        merchants: updatedMerchants,
        isCreating: false
      };

    case t.CREATE_MERCHANT_FAILURE:
      return {
        ...state,
        isCreating: false
      };

    case t.GET_MERCHANT_PENDING:
      return {
        ...state,
        isMerchantLoading: true
      };

    case t.GET_MERCHANT_SUCCESS:
      return {
        ...state,
        merchant: action.payload,
        isMerchantLoaded: true,
        isMerchantLoading: false
      };

    case t.GET_MERCHANT_FAILURE:
      return {
        ...state,
        isMerchantLoaded: false,
        isMerchantLoading: false
      };

    case t.GET_MERCHANTS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_MERCHANTS_SUCCESS:
      return {
        ...state,
        merchants: action.payload,
        invoices: [],
        isLoaded: true,
        isLoading: false
      };

    case t.GET_MERCHANTS_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.GET_TRANSACTIONS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactions: action.payload,
        isLoaded: true,
        isLoading: false
      };
    }
    case t.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.UPDATE_MERCHANT_PENDING:
      return {
        ...state,
        isUpdatingMerchant: true
      };

    case t.UPDATE_MERCHANT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { id } = action.payload;
      const merchants = cloneDeep(state.merchants);
      let updateMerchants = merchants.map(merchant => {
        if (merchant.id === id) {
          merchant = cloneDeep(action.payload.data.data);
          const updateMerchant = merchant;
          return updateMerchant;
        }
        return merchant;
      });
      console.log(updateMerchants);
      return {
        ...state,
        merchants: updateMerchants,
        isUpdatingMerchant: false
      };
    }

    case t.UPDATE_MERCHANT_FAILURE:
      return {
        ...state,
        isUpdatingMerchant: false
      };

    case t.CREATE_CONTACT_PENDING:
      return {
        ...state,
        isCreatingContact: true
      };

    case t.CREATE_CONTACT_SUCCESS:
      if (!state.merchant) {
        return;
      }

      const updatedMerchant1 = cloneDeep(state.merchant);

      if (!updatedMerchant1.merchant.contacts) {
        updatedMerchant1.merchant.contacts = [];
      }

      updatedMerchant1.merchant.contacts.push(action.payload);

      return {
        ...state,
        merchant: updatedMerchant1,
        isCreatingContact: false
      };

    case t.CREATE_CONTACT_FAILURE:
      return {
        ...state,
        isCreatingContact: false
      };

    case t.UPDATE_CONTACT_PENDING:
      return {
        ...state,
        isUpdatingContact: true
      };

    case t.UPDATE_CONTACT_SUCCESS:
      if (!state.merchant) {
        return;
      }

      const updatedContactMerchant = cloneDeep(state.merchant);

      if (!updatedContactMerchant.merchant.contacts) {
        return;
      }

      updatedContactMerchant.merchant.contacts.push(action.payload);

      return {
        ...state,
        merchant: updatedContactMerchant,
        isCreatingContact: false
      };

    case t.UPDATE_CONTACT_FAILURE:
      return {
        ...state,
        isCreatingContact: false
      };

    case t.CREATE_LOCATION_PENDING:
      return {
        ...state,
        isCreatingLocation: true
      };

    case t.CREATE_LOCATION_SUCCESS:
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations.push(action.payload.data.data);
          const updatedLocationMerchant = merchant;

          return updatedLocationMerchant;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isCreatingLocation: false
      };

    case t.CREATE_LOCATION_FAILURE:
      return {
        ...state,
        isCreatingLocation: false
      };
    case t.UPDATE_LOCATION_PENDING:
      return {
        ...state,
        isCreatingLocation: true
      };

    case t.UPDATE_LOCATION_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations[0] = action.payload.data.data;
          const updatedLocationMerchant = merchant;

          return updatedLocationMerchant;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isCreatingLocation: false
      };
    }

    case t.UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        isCreatingLocation: false
      };
    case t.SYNC_MERCHANT_PENDING:
      return {
        ...state,
        isSyncMerchant: true
      };

    case t.SYNC_MERCHANT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { id } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === id) {
          merchant.integrationData = action.payload.data.data;
          const updatedSyncMerchant = merchant;

          return updatedSyncMerchant;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isSyncMerchant: false
      };
    }
    case t.SYNC_MERCHANT_FAILURE:
      return {
        ...state,
        isSyncMerchant: false
      };
    case t.SYNC_LOCATION_PENDING:
      return {
        ...state,
        isSyncLocation: true
      };

    case t.SYNC_LOCATION_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations[0] = action.payload.data.data;
          const updatedSyncLocationMerchant = merchant;

          return updatedSyncLocationMerchant;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isSyncLocation: false
      };
    }

    case t.SYNC_LOCATION_FAILURE:
      return {
        ...state,
        isSyncLocation: false
      };
    case t.CREATE_LOCATION_OFFER_PENDING:
      return {
        ...state,
        isCreatingLocationOffer: true
      };

    case t.CREATE_LOCATION_OFFER_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations[0].offers.push(action.payload.data.data);
          const updatedLocationOffer = merchant;

          return updatedLocationOffer;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isCreatingLocationOffer: false
      };
    }
    case t.CREATE_LOCATION_OFFER_FAILURE:
      return {
        ...state,
        isCreatingLocationOffer: false
      };

    case t.UPDATE_LOCATION_OFFER_PENDING:
      return {
        ...state,
        isCreatingLocationOffer: true
      };

    case t.UPDATE_LOCATION_OFFER_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId, offerId, isPrimary } = action.payload;
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations[0].offers.map((offer, index) => {
            if (offer.id === offerId && isPrimary) {
              merchant.locations[0].offers[index] = cloneDeep(
                action.payload.data.data
              );
              const updatedLocationOffer = merchant;

              return updatedLocationOffer;
            }
            if (offer.id === offerId && !isPrimary) {
              merchant.locations[0].offers[index] = cloneDeep(
                action.payload.data.data
              );
              const updatedLocationOffer = merchant;

              return updatedLocationOffer;
            }
          });
        }
        return merchant;
      });
      return {
        ...state,
        merchants,
        isCreatingLocationOffer: false
      };
    }
    case t.UPDATE_LOCATION_OFFER_FAILURE:
      return {
        ...state,
        isCreatingLocationOffer: false
      };

    case t.GET_INVOICES_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        isLoaded: true,
        isLoading: false
      };

    case t.GET_INVOICES_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };
    case t.CREATE_INVOICES_PENDING:
      return {
        ...state,
        isCreating: true
      };

    case t.CREATE_INVOICES_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const merchantId = action.payload.merchantId;
      const updatedInvoice = cloneDeep(state.invoices);
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.invoices.push(action.payload.data.data);
          const updateinvoice = merchant;

          return updateinvoice;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        invoices: updatedInvoice,
        transactions: [],
        merchants,
        isCreating: false
      };
    }
    case t.CREATE_INVOICES_FAILURE:
      return {
        ...state,
        isCreating: false
      };

    case t.CREATE_PRODUCT_PENDING:
      return {
        ...state,
        isCreatingProduct: true
      };

    case t.CREATE_PRODUCT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { id } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === id) {
          merchant.locations[0].products.push(action.payload.data.data);
          const createdProduct = merchant;

          return createdProduct;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isCreatingProduct: false
      };
    }

    case t.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        isCreatingProduct: false
      };
    case t.UPDATE_PRODUCT_PENDING:
      return {
        ...state,
        isUpdatingProduct: true
      };

    case t.UPDATE_PRODUCT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { id } = action.payload;
      const { productId } = action.payload;
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === id) {
          merchant.locations[0].products.map((product, index) => {
            if (product.id === productId) {
              merchant.locations[0].products[index] = cloneDeep(
                action.payload.data.data
              );
              const updatedProduct = merchant;
              return updatedProduct;
            }
          });
        }
        return merchant;
      });

      return {
        ...state,
        merchants,
        isUpdatingProduct: false
      };
    }

    case t.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isUpdatingProduct: false
      };

    case t.GET_MERCHANT_INVOICE_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_MERCHANT_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        isLoaded: true,
        isLoading: false
      };

    case t.GET_MERCHANT_INVOICE_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.CREATE_DISPUTE_PENDING:
      return {
        ...state,
        isCreatingDispute: true
      };

    case t.CREATE_DISPUTE_SUCCESS:
      if (!state.transactions) {
        return;
      }
      const { referenceId } = action.payload;
      const transactions = cloneDeep(state.transactions);

      transactions.map(transaction => {
        if (transaction.id === referenceId) {
          transaction.dispute.push(action.payload.data.data);
          const updatedDispute = transaction;

          return updatedDispute;
        }

        return transaction;
      });
      return {
        ...state,
        transactions,
        isCreatingDispute: false
      };

    case t.CREATE_DISPUTE_FAILURE:
      return {
        ...state,
        isCreatingDispute: false
      };

    case t.CREATE_ACCOUNT_PENDING:
      return {
        ...state,
        isCreatingAccountDetails: true
      };

    case t.CREATE_ACCOUNT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.accounts.push(action.payload.data.data);
          const createAccount = merchant;

          return createAccount;
        }

        return merchant;
      });
      return {
        ...state,
        merchants,
        isCreatingAccountDetails: false
      };
    }

    case t.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isCreatingAccountDetails: false
      };

    case t.UPDATE_INVOICE_PENDING:
      return {
        ...state,
        isUpdatingInvoice: true
      };

    case t.UPDATE_INVOICE_SUCCESS: {
      if (!state.merchants || !state.allInvoices) {
        return;
      }
      const allInvoices = cloneDeep(state.allInvoices);
      const { merchantId } = action.payload;
      const { merchantObjId } = action.payload;
      const { invoiceId } = action.payload;
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.invoices.map((invoice, index) => {
            if (invoice.id === invoiceId || invoice._id === invoiceId ) {
              merchant.invoices[index] = cloneDeep(action.payload.data.data);
              const updatedInvoice = merchant;
              return updatedInvoice;
            }
          });
        }
        return merchant;
      });
      merchants.map(merchant => {
        if (merchant.id === merchantObjId) {
          merchant.invoices.map((invoice, index) => {
            if (invoice.id === invoiceId) {
              merchant.invoices[index] = cloneDeep(
                action.payload.data.results.data
              );
              const updatedInvoice = merchant;
              return updatedInvoice;
            }
          });
        }
        return merchant;
      });
      allInvoices.map((invoice, index) => {
        if (invoice.id === invoiceId) {
          allInvoices[index] = cloneDeep(action.payload.data.data);
          const updatedInvoice = invoice;
          return updatedInvoice;
        }

        return invoice;
      });

      return {
        ...state,
        merchants,
        allInvoices,
        isUpdatingInvoice: false
      };
    }

    case t.UPDATE_INVOICE_FAILURE:
      return {
        ...state,
        isUpdatingInvoice: false
      };

    case t.UPDATE_ACCOUNT_PENDING:
      return {
        ...state,
        isUpdatingAccount: true
      };

    case t.UPDATE_ACCOUNT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const { accountId } = action.payload;
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.accounts.map((account, index) => {
            if (account.id === accountId) {
              merchant.accounts[index] = action.payload.data.data;
              const updatedAccount = merchant;

              return updatedAccount;
            }
          });
        }

        return merchant;
      });
      return {
        ...state,
        merchants,
        isUpdatingAccount: false
      };
    }
    case t.UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isUpdatingAccount: false
      };

    case t.GET_ALL_INVOICE_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_ALL_INVOICE_SUCCESS:
      return {
        ...state,
        allInvoices: action.payload,
        isLoaded: true,
        isLoading: false
      };

    case t.GET_ALL_INVOICE_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.UPDATE_LOCATION_DETAILS_PENDING:
      return {
        ...state,
        isUpdatingLocationDetails: true
      };

    case t.UPDATE_LOCATION_DETAILS_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId, locationId } = action.payload;
      const merchants = cloneDeep(state.merchants);
      let updateMerchants = merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations.map((location, index) => {
            if (location.id === locationId) {
              merchant.locations[index].cardSchemes = cloneDeep(
                action.payload.data.data.cardSchemes
              );
              merchant.locations[index].contact = cloneDeep(
                action.payload.data.data.contact
              );
              merchant.locations[index].workingTimings = cloneDeep(
                action.payload.data.data.workingTimings
              );
              const updatedLocationDetails = merchant;
              return updatedLocationDetails;
            }
          });
        }
        return merchant;
      });
      return {
        ...state,
        merchants,
        isUpdatingLocationDetails: false
      };
    }

    case t.UPDATE_LOCATION_DETAILS_FAILURE:
      return {
        ...state,
        isUpdatingLocationDetails: false
      };

    case t.CREATE_LOCATION_CUISINE_PENDING:
      return {
        ...state,
        isCreatingLocationCuisine: true
      };

    case t.CREATE_LOCATION_CUISINE_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations[0].cuisines.push(action.payload.data.data);
          const createdProduct = merchant;

          return createdProduct;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isCreatingLocationCuisine: false
      };
    }
    case t.CREATE_LOCATION_CUISINE_FAILURE:
      return {
        ...state,
        isCreatingLocationCuisine: false
      };

    case t.UPDATE_LOCATION_CUISINE_PENDING:
      return {
        ...state,
        isUpdatingLocationCuisine: true
      };

    case t.UPDATE_LOCATION_CUISINE_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { merchantId, cuisineId } = action.payload;
      const merchants = cloneDeep(state.merchants);
      merchants.map(merchant => {
        if (merchant.id === merchantId) {
          merchant.locations[0].cuisines.map((cuisine, index) => {
            if (cuisine.id === cuisineId) {
              merchant.locations[0].cuisines[index] = cloneDeep(
                action.payload.data.data
              );
              const updatedProduct = merchant;
              return updatedProduct;
            }
          });
        }
        return merchant;
      });

      return {
        ...state,
        merchants,
        isUpdatingLocationCuisine: false
      };
    }

    case t.UPDATE_LOCATION_CUISINE_FAILURE:
      return {
        ...state,
        isUpdatingLocationCuisine: false
      };
    case t.GET__REDEEM_TRANSACTIONS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET__REDEEM_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        redeemTransactions: action.payload,
        isLoaded: true,
        isLoading: false
      };
    }
    case t.GET__REDEEM_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.UPDATE_REDEEM_TRANSACTIONS_PENDING:
      return {
        ...state,
        isUpdatingRedeemTransactions: true
      };

    case t.UPDATE_REDEEM_TRANSACTIONS_SUCCESS: {
      if (!state.redeemTransactions) {
        return;
      }
      const { id } = action.payload;
      const redeemTransactions = cloneDeep(state.redeemTransactions);
      let updateRedeems = redeemTransactions.map(redeem => {
        if (redeem.id === id) {
          redeem = cloneDeep(action.payload.data.data);
          const updateRedeem = redeem;
          return updateRedeem;
        }
        return redeem;
      });
      return {
        ...state,
        redeemTransactions: updateRedeems,
        isUpdatingRedeemTransactions: false
      };
    }
    case t.UPDATE_REDEEM_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isUpdatingRedeemTransactions: false
      };

    case t.APPROVE_MERCHANT_PENDING:
      return {
        ...state,
        isApproveMerchant: true
      };

    case t.APPROVE_MERCHANT_SUCCESS: {
      if (!state.merchants) {
        return;
      }
      const { id } = action.payload;
      const merchants = cloneDeep(state.merchants);

      merchants.map(merchant => {
        if (merchant.id === id) {
          merchant.integrationData = action.payload.data.data;
          const updatedApproveMerchant = merchant;

          return updatedApproveMerchant;
        }

        return merchant;
      });

      return {
        ...state,
        merchants,
        isApproveMerchant: false
      };
    }
    case t.APPROVE_MERCHANT_FAILURE:
      return {
        ...state,
        isApproveMerchant: false
      };
    default:
      return state;
  }
}
