import GiftClient from '../../../src/js/helpers/GiftClient';
import stabGiftService from '../stabs/GiftServer/GiftServer';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

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

function testGiftCategoryService(endpoint) {

  it('Calling the "giftCategory" service must return an object including gift categories', function () {
    const client = GiftClient.connect(endpoint);
    const result = client.giftCategory({ id: 1 });
    return result.then(resp => {
      assert.isDefined(resp);
      assert.isDefined(resp.response);
      assert.isDefined(resp.response.listCategory);
      assert.isArray(resp.response.listCategory);
      resp.response.listCategory.forEach(category => {
        assert.isDefined(category.id);
        assert.isDefined(category.categoryName);
        assert.isDefined(category.url);
      });
    });
  });

}

function testAnswerService(endpoint) {

  it('Calling the "answer" service returns only an empty 200', function () {
    const client = GiftClient.connect(endpoint);
    const result = client.answer({
      facebookId: 1,
      answers: [ 
        {
          id: 1,
          value: 24
        },
        {
          id: 2,
          value: 'Female'
        },
        {
          id: 3,
          value: 'Birthday'
        },
        {
          id: 4,
          value: 100
        }
      ]
    });
    return result.should.be.fulfilled;
  });

}

function testStartService(endpoint) {

  it('Calling the "start" service must return an object with the service names', function () {
    const client = GiftClient.connect(endpoint);
    const result = client.start({ id: 99 });
    return result.then(resp => {
      assert.isDefined(resp);
      assert.isDefined(resp.response);
      assert.isDefined(resp.response.startFlowList);
      assert.isArray(resp.response.startFlowList);
      resp.response.startFlowList.forEach(service => {
        assert.isDefined(service.sequence);
        assert.isDefined(service.methodName);
        assert.isDefined(service.methodType);
      });
    });
  });

}

function testFlagGiftCategoryService(endpoint) {

  it('Calling the "flagGiftCategory" service returns only an empty 200', function () {
    const client = GiftClient.connect(endpoint);
    const result = client.flagGiftCategory({
      facebookId: 1,
      id: 1,
      flag: true
    });
    return result.should.be.fulfilled;
  });

}

function testGiftResult(endpoint) {

  it('Calling the "giftResult" service must return an object including gift details', function () {
    const client = GiftClient.connect(endpoint);
    const result = client.giftResult({ id: 1 });
    return result.then(resp => {
      assert.isDefined(resp);
      assert.isDefined(resp.response);
      assert.isDefined(resp.response.items);
      assert.isArray(resp.response.items);
      resp.response.items.forEach(item => {
        assert.isDefined(item.label);
        assert.isDefined(item.price);
        assert.isDefined(item.formattedPrice);
        assert.isDefined(item.amazonURL);
        assert.isDefined(item.largeImageURL);
      });
    });
  });

}

function testUserDetails(endpoint) {

  it('Calling the "userDetail" service must return an object with the user`s personal informations', function () {
    const client = GiftClient.connect(endpoint);
    const facebookId = '99';
    const result = client.userDetail({ id: facebookId });
    return result.then(resp => {
      assert.isDefined(resp);
      assert.isDefined(resp.response);
      assert.isDefined(resp.response.facebookId);
      expect(resp.response.facebookId).to.be.equal(facebookId);
    }, err => {
      console.log(err);
    });
  });

}

describe('GiftClient', () => {
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
    it('connect() must return an object exposing "giftCategory" function',  () => {
      const client = GiftClient.connect(environment.stab);
      assert.isFunction(client.giftCategory);
    });
    it('question() must return a Promise', () => {
      const client = GiftClient.connect(environment.stab);
      const result = client.question({ id: 16 });
      assert.isDefined(result);
      assert.isTrue(result instanceof Promise);
    });
    it('giftCategory() must return a Promise', () => {
      const client = GiftClient.connect(environment.stab);
      const result = client.giftCategory({ id: 18 });
      assert.isDefined(result);
      assert.isTrue(result instanceof Promise);
    });
      
  });

  describe('#Services', () => {

    describe('GET /question', testQuestionService.bind(null, environment.stab));
    describe('GET /giftCategory', testGiftCategoryService.bind(null, environment.stab));
    describe('POST /answer', testAnswerService.bind(null, environment.stab));
    describe('GET /start', testStartService.bind(null, environment.stab));
    describe('POST /flagGiftCategory', testFlagGiftCategoryService.bind(null, environment.stab));
    describe('GET /giftResult', testGiftResult.bind(null, environment.stab));
    describe('GET /userDetail', testUserDetails.bind(null, environment.stab));

  });

  describe('#Integration', () => {

    describe('GET /question', testQuestionService.bind(null, environment.integration));
    describe('GET /giftCategory', testGiftCategoryService.bind(null, environment.integration));
    describe('POST /answer', testAnswerService.bind(null, environment.integration));
    describe('GET /start', testStartService.bind(null, environment.integration));
    describe('POST /flagGiftCategory', testFlagGiftCategoryService.bind(null, environment.integration));
    describe('GET /giftResult', testGiftResult.bind(null, environment.integration));
    describe('GET /userDetail', testUserDetails.bind(null, environment.integration));
    
  });

});
