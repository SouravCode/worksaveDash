import { API } from "../../../../services";

export default async function createDispute(
  { comment, disputeId, status, createdBy, referenceId, type },
  accessToken
) {
  const apiResponse = await API.Client.createDispute(
    {
      comment,
      disputeId,
      status,
      createdBy,
      referenceId,
      type
    },
    accessToken
  );

  return apiResponse;
}
