/* global module, Promise, require */

import Client from './Client';

/**
 * Client object that represent a connection to the given abel endpoint 
 * @param {string} serviceURL URL to the service endpoint
 */
function GiftClient(serviceURL) {

  const client = Client.connect({ endpoint: serviceURL });

  return {

    question: function(options) {
      const id = options.id;
      return client.get(`question/${id}`);
    },

    giftCategory: function(options) {
      const id = options.id;
      return client.get(`giftCategory/${id}`);
    },

    answer: function(options) {
      return client.post('answer', options);
    },

    start: function(options) {
      const id = options.id;
      return client.get(`start/${id}`);
    },

    flagGiftCategory: function(options) {
      return client.post('flagGiftCategory', options);      
    },

    giftResult: function(options) {
      const id = options.id;
      return client.get(`giftResult/${id}`);
    },

    swipeResult: function(options) {
      return client.post('swipeResult', options);
    },

    userDetail: function(options) {
      const id = options.id;
      return client.get(`userDetail/${id}`);
    }

  };

}

/**
 * Exposing the API to the shared context 
 * @type {object}
 */
export default {

  /**
   * Returns an instance of a GiftClient connected to the given endpoint
   * @param {string} endpoint Endpoint of the Gift service
   * @return {object} Instance of the GiftClient 
   */
  connect(endpoint){
    if (!endpoint){
      throw 'Endpoint to be specified!';
    }
    return new GiftClient(endpoint);
  }

};
