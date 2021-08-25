import { PropTypes } from "prop-types";

export const BAD_QUERY = "BAD_QUERY";
export const BAD_REQUEST = "BAD_REQUEST";
export const SERVER_UNAVAILABLE = "SERVER_UNAVAILABLE";

export const ALL = [BAD_QUERY, BAD_REQUEST, SERVER_UNAVAILABLE];

export function fromKey(key) {
  switch (key) {
    case "BAD_QUERY":
      return BAD_QUERY;
    case "ECONNREFUSED":
      return SERVER_UNAVAILABLE;
    case "invalid_request":
      return BAD_REQUEST;
    default:
      return key;
  }
}

export const PropShape = PropTypes.string;
