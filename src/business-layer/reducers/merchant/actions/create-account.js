import { createAccount as createAccountService } from "../services";
import { isCreatingAccountDetails } from "../selectors";
import * as t from "./action-types";

export default function createAccount(
  { accountName, accountType, accountNumber, merchantId, routingNumber },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingAccountDetails(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_ACCOUNT_PENDING });

    return createAccountService(
      {
        accountName,
        accountType,
        accountNumber,
        merchantId,
        routingNumber
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_ACCOUNT_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.CREATE_ACCOUNT_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Create Account", err);

        dispatch({ type: t.CREATE_LOCATION_OFFER_FAILURE });
      });
  };
}
