const API_ENDPOINT = "/api/analytics";

const Analytics = {
  /**
   * Track an internal action for analytics.
   *
   * @param  {String}  event    Name of event
   * @param  {Object}  [data={}] Event data to pass back
   * @return {Promise}
   */
  track(payload, apiEndpoint = API_ENDPOINT, useBeacon = false) {
    console.log("Analytics Event Fired with the following payload:", payload);
    return payload;
  }
};

export default Analytics;
