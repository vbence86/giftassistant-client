/* global module, Promise, require */

// Polyfill for Fetch API
// https://github.com/matthew-andrews/isomorphic-fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

const defaults = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * returns headers to be used to issue a valid request
 * @return {Headers} instance of native Headers prototype 
 */
function getHeaders() {
  let headers = new Headers(defaults.headers);
  return headers;
}

/**
 * returns a JSON string from the given object 
 * @param  {object} req Object to be stringified
 * @return {Promise} Genuine Promise instance
 */
function getBody(req) {
  return JSON.stringify(req);
}

/**
 * returns a resolved or rejected promise as per the response status
 * @param  {Response} resp native Response object coming from the Fetch API
 * @return {Promise} Promise object representing the result of the operation
 */
function status(resp) {
  if (resp.ok) {
    return resp;
  } else {
    return new Promise((resolve, reject) => {
        return jsonify(resp).then(json => {
            reject(json);
        });
    });
  }
}

/**
 * Parses the response in order to create a Javascript object from it
 * @param  {Response} resp native Response object coming from the Fetch API
 * @return {Promise} Promise object representing the result of the operation]
 */
function jsonify(resp){
  if (!resp || !resp.json) throw 'Invalid Response object!';
  return resp
    .json()
    .catch(err => {
      return Promise.resolve();
    });
}

/**
 * Unified error function to handle unexpected behaviour and return a promise
 * @param  {object} err Exception object
 * @return {Promise} Rejected promise after the error is handled
 */
function error(err){
  return Promise.reject(err);
}

/**
 * Transforms an object into url params
 * @param {object} Key value pairs to be translated into a string
 * @return {string} url params
 */
function queryParams(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

/**
 * Client object that represent a connection to the given abel endpoint 
 * @param {string} serviceURL URL to the service endpoint
 */
function Client(serviceURL) {

  return {

    /**
     * Sends a get request to the specified endpoint 
     * @param  {string} service suffix of service endpoint URL
     * @param  {object} params  Data to send to the service
     * @return {Promise} Promise for the resolution of the operation
     */
    get(service, params){
      if (!service) throw 'Invalid service name!';

      let url = `${serviceURL}/${service}`;
      const init = { 
        method: 'GET',
        mode: 'cors',
        headers: getHeaders(),
        cache: 'default',
        credentials: 'same-origin'
      };

      if (params) {
        const query_string = queryParams(params);
        url = `${url}?${query_string}`;
      }

      return fetch( new Request(url, init) )
        .then(status)
        .then(jsonify)
        .catch(error);
    },   

    /**
     * Sends a post request to the specified endpoint 
     * @param  {string} service suffix of service endpoint URL
     * @param  {object} params  Data to send to the service
     * @return {Promise} Promise for the resolution of the operation
     */
    post(service, params){
      if (!service) throw 'Invalid service name!';

      const url = `${serviceURL}/${service}`;
      const init = { 
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(),
        cache: 'default',
        body: getBody(params),
        credentials: 'same-origin'
      };
      return fetch( new Request(url, init) )
        .then(status)
        .then(jsonify)
        .catch(error);
    },

    /**
     * Sends a delete request to the specified endpoint 
     * @param  {string} service suffix of service endpoint URL
     * @param  {object} params  Data to send to the service
     * @return {Promise} Promise for the resolution of the operation
     */
    delete(service, params){
        if (!service) throw 'Invalid service name!';

        const url = `${serviceURL}/${service}`;
        const init = { 
          method: 'DELETE',
          mode: 'cors',
          headers: getHeaders(),
          cache: 'default',
          body: getBody(params),
          credentials: 'same-origin'
        };
        return fetch( new Request(url, init) )
          .then(status)
          .then(jsonify)
          .catch(error);
    }
                  
  };
}

/**
 * Exposing the API to the shared context 
 * @type {object}
 */
export default {
  connect(config){
    if (!config){
      throw 'Invalid config object passed!';
    }
    if (!config.endpoint){
      throw 'Endpoint to be specified!';
    }
    return new Client(config.endpoint);
  }
};
