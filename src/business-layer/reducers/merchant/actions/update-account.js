import { updateAccount as updateAccountService } from "../services";
import { isUpdatingAccount } from "../selectors";
import * as t from "./action-types";

export default function updateAccount(
  {
    merchantId,
    accountId,
    accountName,
    accountType,
    accountNumber,
    routingNumber
  },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingAccount(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_ACCOUNT_PENDING });

    return updateAccountService(
      {
        merchantId,
        accountId,
        accountName,
        accountType,
        accountNumber,
        routingNumber
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_ACCOUNT_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId, accountId },
            type: t.UPDATE_ACCOUNT_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Update Account", err);

        dispatch({ type: t.UPDATE_ACCOUNT_FAILURE });
      });
  };
}
