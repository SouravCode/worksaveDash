import { isUpdatingMerchant } from "../selectors";
import { updateMerchant as updateMerchantService } from "../services";
import * as t from "./action-types";
export default function updateMerchant(
  {
    name,
    description,
    emailId,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    logoUrl,
    category,
    id,
    status,
    imageUrls
  },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingMerchant(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_MERCHANT_PENDING });

    return updateMerchantService(
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
        id,
        status,
        imageUrls
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_MERCHANT_FAILURE });
        } else {
          dispatch({
            payload: { data, id },
            type: t.UPDATE_MERCHANT_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Updating MERCHANT", err);

        dispatch({ type: t.UPDATE_MERCHANT_FAILURE });
      });
  };
}
