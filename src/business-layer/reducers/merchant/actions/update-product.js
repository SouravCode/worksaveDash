import { isUpdatingProduct } from "../selectors";
import { updateProduct as updateProductService } from "../services";
import * as t from "./action-types";
export default function updateProduct(
  { name, description, price, imageUrls, locationId, id, productId, priority },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingProduct(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_PRODUCT_PENDING });

    return updateProductService(
      {
        name,
        description,
        price,
        imageUrls,
        locationId,
        id,
        productId,
        priority
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_PRODUCT_FAILURE });
        } else {
          dispatch({
            payload: { data, id, productId },
            type: t.UPDATE_PRODUCT_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while creating PRODUCT", err);

        dispatch({ type: t.UPDATE_PRODUCT_FAILURE });
      });
  };
}
