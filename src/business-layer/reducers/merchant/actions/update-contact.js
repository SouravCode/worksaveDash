import { isUpdatingContact } from "../selectors";
import { updateContact as updateContactService } from "../services";

import * as t from "./action-types";

export default function updateContact({ merchantId, display, type, value }) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingContact(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_CONTACT_PENDING });

    return updateContactService({ merchantId, display, type, value })
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_CONTACT_FAILURE });
        } else {
          dispatch({ payload: data, type: t.UPDATE_CONTACT_SUCCESS });
        }
      })
      .catch(err => {
        console.log("Error while updating merchant contact", err);

        dispatch({ type: t.UPDATE_CONTACT_FAILURE });
      });
  };
}
