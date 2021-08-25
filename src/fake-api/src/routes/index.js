import uuid from "react-uuid";

const CALLS_DELAY = 400;

export default function routes() {
  this.namespace = "";

  this.post(
    "/merchant",
    (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      schema.merchants.create({ id: uuid(), ...attrs });

      return {
        success: true
      };
    },
    { timing: CALLS_DELAY }
  );

  this.get(
    "/merchant/:id",
    (schema, request) => {
      return schema.merchants.find(request.params.id);
    },
    { timing: CALLS_DELAY }
  );

  // this.get(
  //   "/merchants",
  //   schema => {
  //     return schema.merchants.all();
  //   },
  //   { timing: CALLS_DELAY }
  // );

  this.patch(
    "/merchant/:id",
    (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);

      let id = request.params.id;

      let merchant = schema.merchants.find(id);

      return merchant.update(newAttrs);
    },
    { timing: CALLS_DELAY }
  );

  this.patch(
    "/merchant/:merchantId/contact/:contactId",
    (schema, request) => {
      let updatedAttrs = JSON.parse(request.requestBody);

      const { merchantId, contactId } = request.params;

      let merchant = schema.merchants.find(merchantId);
      let contact = merchant.contacts.find(contactId);

      return contact.update(updatedAttrs);
    },
    { timing: CALLS_DELAY }
  );

  this.post(
    "/merchant/:merchantId/contact",
    (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      let id = request.params.merchantId;

      let merchant = schema.merchants.find(id);

      merchant.contacts.create(attrs);
    },
    { timing: CALLS_DELAY }
  );
}
