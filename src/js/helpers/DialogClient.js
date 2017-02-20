/* global module, Promise, require */

import Client from './Client';

/**
 * Client object that represent a connection to the given abel endpoint 
 * @param {string} serviceURL URL to the service endpoint
 */
function DialogClient(serviceURL) {

  const client = Client.connect({ endpoint: serviceURL });

  return {

    question: function(options) {
      const id = options.id;
      return client.get(`question/${id}`);
    }

  };

}

/**
 * Exposing the API to the shared context 
 * @type {object}
 */
export default {

  /**
   * Returns an instance of a DialogClient connected to the given endpoint
   * @param {string} endpoint Endpoint of the Dialog service
   * @return {object} Instance of the DialogClient 
   */
  connect(endpoint){
    if (!endpoint){
      throw 'Endpoint to be specified!';
    }
    return new DialogClient(endpoint);
  }

};
