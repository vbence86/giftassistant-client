import Client from '../../../src/js/helpers/Client';

const assert = require('chai').assert;
const ENDPOINT = 'http://www.google.co.uk';

describe('Client', () => {
  'use strict';

  describe('#Availability', () => {
      it('Client must not be undefined when imported', () => {
          assert.isDefined(Client);
      });
  });

  describe('#API', () => {

    it('Client should expose a "connect" function', () => {
      assert.isFunction(Client.connect);
    });
    it('Client should throw an error expose a "connect" function', () => {
      assert.isFunction(Client.connect);
    });
    it('connect() must throw an error when invoked with no params', function () {
      assert.throws(Client.connect);
    });
    it('connect() must throw an error when invoked with invalid params', function () {
      assert.throws(Client.connect.bind(Client, 123));
      assert.throws(Client.connect.bind(Client, 'Something'));
      assert.throws(Client.connect.bind(Client, {}));
    });
    it('connect() must returns an object', function () {
      const client = Client.connect({ endpoint: ENDPOINT });
      assert.isDefined(client);
    }); 
    it('connect() must returns an object exposing "post" function', function () {
      const client = Client.connect({ endpoint: ENDPOINT });
      assert.isFunction(client.post);
    });
    it('connect() must returns an object exposing "delete" function', function () {
      const client = Client.connect({ endpoint: ENDPOINT });
      assert.isFunction(client.delete);
    });
      
  });

});
