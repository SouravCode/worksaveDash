import { isCreatingProduct } from "../selectors";
import { createProduct as createProductService } from "../services";
import * as t from "./action-types";
export default function createProduct(
  { name, description, price, imageUrls, id, locationId },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingProduct(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_PRODUCT_PENDING });

    return createProductService(
      {
        name,
        description,
        price,
        id,
        imageUrls,
        locationId
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_PRODUCT_FAILURE });
        } else {
          dispatch({ payload: { data, id }, type: t.CREATE_PRODUCT_SUCCESS });
        }
      })
      .catch(err => {
        console.log("Error while creating PRODUCT", err);

        dispatch({ type: t.CREATE_PRODUCT_FAILURE });
      });
  };
}
