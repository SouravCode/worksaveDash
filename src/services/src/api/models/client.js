import { HttpClient } from "../../../";
import { URI, programKey } from "../../../../app-config";
import notify from "devextreme/ui/notify";

function getAuthorizedHeaders(accessToken) {
  return accessToken
    ? {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "program-key": programKey
    }
    : {
      Accept: "application/json",
      "Content-Type": "application/json",
      "program-key": programKey
    };
}

export async function getMerchants(accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);

    const response = await fetch(`${URI}/merchants?${param}`, {
      headers
    });
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get merchants error", err);

    return null;
  }
}

export async function getTransactions(accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/transactions/?${param}`, {
      headers
    });
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get transactions error", err);

    return null;
  }
}
export async function getStripeSessionDetails(
  accessToken,
  { stripeCustomerId, merchantObjId, merchantAccountObjId }
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/stripe-checkout`, {
      body: JSON.stringify({
        stripeCustomerId,
        merchantObjId,
        merchantAccountObjId
      }),
      headers,
      method: "POST"
    });
    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }
  } catch (err) {
    console.warn("stripe-checkout error", err);
  }
}
export async function stripePaymentIntial(
  accessToken,
  { merchantObjId, remotePaymentAccountId, amount, invoiceId }
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/stripe-payment`, {
      body: JSON.stringify({
        merchantObjId,
        remotePaymentAccountId,
        amount,
        invoiceId
      }),
      headers,
      method: "POST"
    });
    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }
    if (response.status === 200) {
      return result;
    }
  } catch (err) {
    console.warn("stripe-checkout error", err);
  }
}
export async function getCustomerTransaction(id, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/transactions/?customerId=${id}`, {
      headers
    });
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get transactions error", err);

    return null;
  }
}

export async function getMerchantTransactions(merchantId, accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(
      `${URI}/merchants/${merchantId}/transactions/?${param}`,
      {
        headers
      }
    );
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get transactions error", err);

    return null;
  }
}

export async function getMerchant(accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/merchant`, {
      headers
    });

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get merchant error", err);

    return null;
  }
}

export async function createMerchant(
  {
    name,
    category,
    emailId,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    description,
    logoUrl,
    timings,
    imageUrls
  },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/merchants`, {
      body: JSON.stringify({
        name,
        category,
        emailId,
        firstName,
        lastName,
        mobileNumber,
        phoneNumber,
        description,
        logoUrl,
        timings,
        imageUrls
      }),

      headers,
      method: "POST"
    });

    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create merchant error", err);

    return null;
  }
}
export async function createProduct(
  { name, description, price, imageUrls, id, locationId },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${id}/locations/${locationId}/products`,
      {
        body: JSON.stringify({ name, price, description, imageUrls }),
        headers,
        method: "POST"
      }
    );

    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create product error", err);

    return null;
  }
}

export async function createLocation(
  {
    city,
    country,
    currency,
    latitude,
    line1,
    line2,
    longitude,
    state,
    zip,
    merchantId
  },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations`,
      {
        body: JSON.stringify({
          city,
          country,
          currency,
          latitude,
          line1,
          line2,
          longitude,
          state,
          zip
        }),
        headers,
        method: "POST"
      }
    );

    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }
    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create location error", err);

    return null;
  }
}
export async function createOffer(
  {
    merchantId,
    locationId,
    prevOfferId,
    offerType,
    status,
    offerCategory,
    offerValue,
    woveValue,
    offerLimitValue,
    startDate,
    endDate,
    isPrimary
  },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/offers`,
      {
        body: JSON.stringify({
          isPrimary,
          prevOfferId,
          offerType,
          status,
          offerCategory,
          offerValue,
          woveValue,
          offerOriginalValue: Number(offerValue) + Number(woveValue),
          offerLimitValue,
          startDate,
          endDate
        }),
        headers,
        method: "POST"
      }
    );

    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create offer error", err);

    return null;
  }
}

export async function updateMerchant(
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
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/merchant/${id}`, {
      body: JSON.stringify({
        name,
        description,
        emailId,
        firstName,
        lastName,
        mobileNumber,
        phoneNumber,
        logoUrl,
        category,
        status,
        imageUrls
      }),
      headers,
      method: "PUT"
    });

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update merchant error", err);

    return null;
  }
}

export async function updateProduct(
  { name, description, price, locationId, imageUrls, id, productId, priority },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${id}/locations/${locationId}/products/${productId}`,
      {
        body: JSON.stringify({ name, description, price, priority, imageUrls }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update product error", err);

    return null;
  }
}

export async function updateLocation(
  {
    city,
    country,
    currency,
    latitude,
    line1,
    line2,
    longitude,
    state,
    zip,
    merchantId,
    locationId
  },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}`,
      {
        body: JSON.stringify({
          city,
          country,
          currency,
          latitude,
          line1,
          line2,
          longitude,
          state,
          zip
        }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update merchant error", err);

    return null;
  }
}
export async function updateOffer(
  {
    merchantId,
    locationId,
    prevOfferId,
    offerId,
    offerType,
    status,
    offerCategory,
    offerValue,
    woveValue,
    offerLimitValue,
    startDate,
    endDate,
    isPrimary
  },
  accessToken
) {
  let data={
    isPrimary,
    prevOfferId,
    offerType,
    status,
    offerCategory,
    offerValue,
    woveValue,
    offerOriginalValue: Number(offerValue) + Number(woveValue),
    offerLimitValue,
    startDate,
    endDate
  }
  console.log("Request Update Offer>>>", data);
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/offers/${offerId}`,
      {
        body: JSON.stringify({
          isPrimary,
          prevOfferId,
          offerType,
          status,
          offerCategory,
          offerValue,
          woveValue,
          offerOriginalValue: Number(offerValue) + Number(woveValue),
          offerLimitValue,
          startDate,
          endDate
        }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();
    console.log("Update Offer API Response>>>>>>>>>>>>>",result)

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update offer error", err);

    return null;
  }
}
export async function syncMerchant(id, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/merchants/${id}/sync`, {
      body: JSON.stringify(id),
      headers,
      method: "POST"
    });
    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("sync merchant error", err);

    return null;
  }
}
export async function syncLocation({ merchantId, locationId }, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/sync`,
      {
        body: JSON.stringify({ merchantId, locationId }),
        headers,
        method: "POST"
      }
    );
    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("sync merchant error", err);

    return null;
  }
}

export async function getCustomers(accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/customers/?${param}`, { headers });

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get customers error", err);

    return null;
  }
}

export async function getInvoice(id, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/merchants/${id}/invoices`, {
      headers
    });
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get Invoices error", err);

    return null;
  }
}

export async function getSalesReport(id, input, accessToken) {
  try {
    const param = input ? input : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${id}/sales-report/?${param}`,
      {
        headers
      }
    );
    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("sales report error", err);
    return null;
  }
}

export async function createInvoice(
  {
    startDate,
    endDate,
    dueDate,
    invoiceNumber,
    transactions,
    merchantId,
    invoiceAmount
  },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/invoices`,
      {
        body: JSON.stringify({
          startDate,
          endDate,
          dueDate,
          currentStatus: "INVOICE_RAISED",
          isParent: "true",
          invoiceNumber,
          invoiceAmount,
          status: "INVOICE_RAISED",
          transactions
        }),
        headers,
        method: "POST"
      }
    );
    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create invoice error", err);

    return null;
  }
}
export async function getStats(id, input, accessToken) {
  try {
    const param = input ? input : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${id}/sales-report/?${param}`,
      {
        headers
      }
    );
    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("sales report error", err);
    return null;
  }
}

export async function getMerchantInvoice(id, accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/merchants/${id}/invoices?${param}`, {
      headers
    });

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get customers error", err);

    return null;
  }
}

export async function getMerchantOffer(merchantId, locationId, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/offers`,
      { headers }
    );

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get customers error", err);

    return null;
  }
}
export async function getMerchantDetail(accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);

    const response = await fetch(`${URI}/merchant`, { headers });
    if (response === null) {
      localStorage.setItem("merchant", "");
    }

    const result = await response.json();

    if (response.status === 200) {
      if (result && result.data && result.data.length > 0) {
        localStorage.setItem("merchant", JSON.stringify(result.data[0]));
      }
      console.log('result', result);
      return result;
    }

    localStorage.setItem("merchant", "");
  } catch (err) {
    console.warn("get merchant details error", err);

    localStorage.setItem("merchant", "");
  }
}

export async function getMerchantDisputeStat(id, query, accessToken) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${id}/dispute-stats/?${param}`,
      {
        headers
      }
    );

    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("Merchant dispute stats report error", err);
    return null;
  }
}

export async function getMerchantDisputes(merchantId, accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(
      `${URI}/merchants/${merchantId}/disputes?${param}`,
      {
        headers
      }
    );

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get merchant dispute error", err);

    return null;
  }
}

export async function setDisputeMessage(input, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${input.merchantId}/disputes`,
      {
        body: JSON.stringify(input),
        headers,
        method: "POST"
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("Merchant dispute messgae  error", err);
    return null;
  }
}

export async function createDispute(
  { comment, disputeId, status, createdBy, referenceId, type },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/transactions/${referenceId}/disputes`,
      {
        body: JSON.stringify({
          comment,
          disputeId,
          status,
          createdBy,
          referenceId,
          type,
          isLast: "true"
        }),
        headers,
        method: "POST"
      }
    );

    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create dispute error", err);

    return null;
  }
}

export async function createAccount(
  { accountName, accountType, accountNumber, merchantId, routingNumber },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/accounts`,
      {
        body: JSON.stringify({
          accountName,
          accountType,
          routingNumber,
          status: "ACTIVE",
          accountNumber
        }),
        headers,
        method: "POST"
      }
    );
    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create Account error", err);
    return null;
  }
}

export async function getDefaultTransactions(merchantId, accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(
      `${URI}/merchants/${merchantId}/defaulttransaction`,
      {
        headers
      }
    );
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get transactions error", err);
    return null;
  }
}

export async function updateInvoice(
  { status, comment, merchantId, invoiceId },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/invoices/${invoiceId}`,
      {
        body: JSON.stringify({ status, comment }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update invoice error", err);

    return null;
  }
}

export async function getStatus(status, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/system-types?type=${status}`,
      {
        headers,
        method: "GET"
      }

    );

    const result = await response.json();
    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("status error", err);

    return null;
  }
}

export async function getInvoiceTransactions(id, accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(
      `${URI}/merchants/${id}/invoice-transactions/?${param}`,
      {
        headers
      }
    );
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get InvoiceTransaction error", err);

    return null;
  }
}

export async function updateAccount(
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
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/account/${accountId}`,
      {
        body: JSON.stringify({
          accountName,
          accountType,
          accountNumber,
          routingNumber,
          status: "ACTIVE"
        }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update Account error", err);

    return null;
  }
}

export async function getCustomerRedeem(id, accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(
      `${URI}/customers/${id}/redeem-transactions?${param}`,
      {
        headers
      }
    );
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get CustomerRedeem error", err);

    return null;
  }
}

export async function updateCustomerRedeem(
  { status, amount, id },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/redeem-transactions/${id}`,
      {
        body: JSON.stringify({
          status,
          amount
        }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update Redeem error", err);

    return null;
  }
}

export async function getAllInvoices(accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/invoices?${param}`, {
      headers
    });
    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get Invoices error", err);

    return null;
  }
}

export async function updateLocationDetails(
  { merchantId, locationId, CardSchemes, workingTimings, contactDetails },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/details`,
      {
        body: JSON.stringify({
          cardSchemes: CardSchemes,
          workingTimings,
          contact: contactDetails
        }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update product error", err);

    return null;
  }
}

export async function createLocationCuisine(
  { merchantId, locationId, priority, name },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/cuisines`,
      {
        body: JSON.stringify({
          priority,
          name
        }),
        headers,
        method: "POST"
      }
    );

    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("create location cuisine error", err);

    return null;
  }
}

export async function updateLocationCuisine(
  { merchantId, locationId, cuisineId, priority, name },
  accessToken
) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${merchantId}/locations/${locationId}/cuisines/${cuisineId}`,
      {
        body: JSON.stringify({
          priority,
          name
        }),
        headers,
        method: "PUT"
      }
    );

    const result = await response.json();

    if (response.status !== 200) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("update location cuisine error", err);

    return null;
  }
}

export async function getSystemParameters(type, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/system-parameters`, {
      // body: JSON.stringify({ type: status }),
      headers,
      method: "GET"
    });

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("status error", err);

    return null;
  }
}

export async function getRedeemTransactions(accessToken, query) {
  try {
    const param = query ? query : "";
    const headers = getAuthorizedHeaders(accessToken);
    const response = await fetch(`${URI}/redeem-transactions?${param}`, {
      headers
    });

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("get RedeemTransactions error", err);

    return null;
  }
}
export async function resetPassword({ oldPassword, newPassword }, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/merchant-change-password`, {
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword
      }),
      headers,
      method: "POST"
    });

    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("change password error", err);

    return null;
  }
}

export async function forgotPassword({ emailId }, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(`${URI}/merchant-password-reset`, {
      body: JSON.stringify({
        emailId: emailId
      }),
      headers,
      method: "POST"
    });

    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("forgot password error", err);

    return null;
  }
}

export async function approveMerchant(id, accessToken) {
  try {
    const headers = getAuthorizedHeaders(accessToken);
    const response = await HttpClient.fetch(
      `${URI}/merchants/${id}/account/sync`,
      {
        body: JSON.stringify(id),
        headers,
        method: "POST"
      }
    );
    const result = await response.json();

    if (response.status !== 201) {
      return notify(result.error, "error", 2500);
    }

    if (response.status === 201) {
      return result;
    }

    return null;
  } catch (err) {
    console.warn("approve merchant error", err);

    return null;
  }
}
