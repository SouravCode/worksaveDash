import { isCreating } from "../selectors";
import { createMerchant as createMerchantService } from "../services";

import * as t from "./action-types";

export default function createMerchant(
  {
    name,
    description,
    emailId,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    category,
    logoUrl,
    imageUrls
  },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreating(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_MERCHANT_PENDING });

    return createMerchantService(
      {
        name,
        description,
        emailId,
        firstName,
        lastName,
        mobileNumber,
        phoneNumber,
        category,
        logoUrl,
        imageUrls
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_MERCHANT_FAILURE });
        } else {
          dispatch({ payload: data, type: t.CREATE_MERCHANT_SUCCESS });
        }
      })
      .catch(err => {
        console.log("Error while creating MERCHANT", err);

        dispatch({ type: t.CREATE_MERCHANT_FAILURE });
      });
  };
}
