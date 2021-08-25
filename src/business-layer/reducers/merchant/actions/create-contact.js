import { isCreatingContact } from "../selectors";
import { createContact as createContactService } from "../services";

import * as t from "./action-types";

export default function createContact({ merchantId, display, type, value }) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingContact(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_CONTACT_PENDING });

    return createContactService({ merchantId, display, type, value })
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_CONTACT_FAILURE });
        } else {
          dispatch({ payload: data, type: t.CREATE_CONTACT_SUCCESS });
        }
      })
      .catch(err => {
        console.log("Error while creating account contact", err);

        dispatch({ type: t.CREATE_CONTACT_FAILURE });
      });
  };
}
