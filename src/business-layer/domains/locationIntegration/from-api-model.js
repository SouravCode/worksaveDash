export default function fromAPIModel({
  id,
  createdDate,
  modifiedDate,
  remoteLocationAccountId,
  remoteLocationActive,
  remoteLocationId,
  remoteLocationLive
}) {
  return Object.freeze({
    id,
    createdDate,
    modifiedDate,
    remoteLocationAccountId,
    remoteLocationActive,
    remoteLocationId,
    remoteLocationLive
  });
}
