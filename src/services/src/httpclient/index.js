class HttpClient {
  static async fetch(url, options) {
    // eslint-disable-next-line no-console
    console.debug(`fetch: fetching ${url}`, options);

    const response = await fetch(url, options);

    // eslint-disable-next-line no-console
    console.debug(`fetch: ${url} returned ${response.status}`, response);

    return Promise.resolve(response);
  }
}

export default HttpClient;
