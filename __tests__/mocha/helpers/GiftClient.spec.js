import GiftClient from '../../../src/js/helpers/GiftClient';
import stabGiftService from '../stabs/GiftServer/GiftServer';

const assert = require('chai').assert;

const MockServicePort = 9872;
const environment = {
  stab: `http://127.0.0.1:${MockServicePort}`,
  integration: 'http://www.extendus.co.uk:9797'
};

function testQuestionService(endpoint) {

  it('Calling the "question" service must return an object including questions', function () {
    const client = GiftClient.connect(endpoint);
    const result = client.question({ id: 18 });
    return result.then(resp => {
      assert.isDefined(resp);
      assert.isDefined(resp.response);
      assert.isDefined(resp.response.questions);
      assert.isDefined(resp.response.questions);
      assert.isArray(resp.response.questions);
      resp.response.questions.forEach(question => {
        assert.isDefined(question.id);
        assert.isDefined(question.label);
        assert.isDefined(question.category);
        assert.isDefined(question.input);
        assert.isDefined(question.values);
      });
    });
  });

}

describe('DialogGiftClient', () => {
  'use strict';

  before(stabGiftService.start.bind(null, MockServicePort));

  describe('#Availability', () => {
      it('GiftClient must not be undefined when imported', () => {
          assert.isDefined(GiftClient);
      });
  });

  describe('#API', () => {

    it('GiftClient should expose a "connect" function', () => {
      assert.isFunction(GiftClient.connect);
    });
    it('connect() must throw an error when invoked with no params', function () {
      assert.throws(GiftClient.connect);
    });
    it('connect() must return an object', () => {
      const client = GiftClient.connect(environment.stab);
      assert.isDefined(client);
    }); 
    it('connect() must return an object exposing "question" function',  () => {
      const client = GiftClient.connect(environment.stab);
      assert.isFunction(client.question);
    });
    it('question() must return a Promise', () => {
      const client = GiftClient.connect(environment.stab);
      const result = client.question({ authenticatedFacebookToken: 'jkfs7583452njfds7238423' });
      assert.isDefined(result);
      assert.isTrue(result instanceof Promise);
    });
      
  });

  describe('#Services', () => {

    describe('GET /question', testQuestionService.bind(null, environment.stab));
      
  });

  describe('#Integration', () => {

    describe('GET /question', testQuestionService.bind(null, environment.integration));
    
  })

});
