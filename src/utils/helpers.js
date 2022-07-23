export const errorHandler = err => {
  if (err.response) {
    console.log('Error response', err.response);
    return err.response.data;
    // The client was given an error response (5xx, 4xx)
  } else if (err.request) {
    console.log('Error request', err.request);
    return err.request;
    // The client never received a response, and the request was never left
  } else {
    // Anything else
    console.log('Error', err);
    return err.message;
  }
};
