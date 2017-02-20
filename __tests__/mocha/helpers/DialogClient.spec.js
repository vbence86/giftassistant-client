import DialogClient from '../../../src/js/helpers/DialogClient';
import stabDialogService from '../stabs/DialogServer/DialogServer';

const assert = require('chai').assert;

const MockServicePort = 9872;
const environment = {
  stab: `http://127.0.0.1:${MockServicePort}`,
  integration: 'http://www.extendus.co.uk:9797'
};

function testQuestionService(endpoint) {

  it('Calling the "question" service must return an object including questions', function () {
    const client = DialogClient.connect(endpoint);
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

describe('DialogDialogClient', () => {
  'use strict';

  before(stabDialogService.start.bind(null, MockServicePort));

  describe('#Availability', () => {
      it('DialogClient must not be undefined when imported', () => {
          assert.isDefined(DialogClient);
      });
  });

  describe('#API', () => {

    it('DialogClient should expose a "connect" function', () => {
      assert.isFunction(DialogClient.connect);
    });
    it('connect() must throw an error when invoked with no params', function () {
      assert.throws(DialogClient.connect);
    });
    it('connect() must return an object', () => {
      const client = DialogClient.connect(environment.stab);
      assert.isDefined(client);
    }); 
    it('connect() must return an object exposing "question" function',  () => {
      const client = DialogClient.connect(environment.stab);
      assert.isFunction(client.question);
    });
    it('question() must return a Promise', () => {
      const client = DialogClient.connect(environment.stab);
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
