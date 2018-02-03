const assert = require('chai').assert;
const utils = require('../lib/utils');
describe('generator-utils', () => {
  describe('littleCamel', () => {
    const cases = [{
      input: 'testPage',
      output: 'testPage'
    }, {
      input: 'TestPage',
      output: 'testPage'
    }, {
      input: 'testPage1',
      output: 'testPage1'
    }, {
      input: '123testPage',
      output: 'testPage'
    }, {
      input: '123TestPage',
      output: 'testPage'
    }, {
      input: '12%^)34TestPage12',
      output: 'testPage12'
    }, {
      input: '**1234test12Page',
      output: 'test12Page'
    }, {
      input: '##12@@34test&&Page',
      output: 'testPage'
    }, {
      input: 'test$12$page',
      output: 'test12page'
    }, {
      input: 'testPage12$$$',
      output: 'testPage12'
    }]
    it('case test', () => {
      cases.forEach(item => assert.equal(item.output, utils.littleCamel(item.input)));
    });

  });
  describe('bigCamel', () => {
    const cases = [{
      input: 'testPage',
      output: 'TestPage'
    }, {
      input: 'TestPage',
      output: 'TestPage'
    }, {
      input: 'testPage1',
      output: 'TestPage1'
    }, {
      input: '123testPage',
      output: 'TestPage'
    }, {
      input: '123TestPage',
      output: 'TestPage'
    }, {
      input: '12%^)34TestPage12',
      output: 'TestPage12'
    }, {
      input: '**1234test12Page',
      output: 'Test12Page'
    }, {
      input: '##12@@34test&&Page',
      output: 'TestPage'
    }, {
      input: 'test$12$page',
      output: 'Test12page'
    }, {
      input: 'testPage12$$$',
      output: 'TestPage12'
    }]
    it('case test', () => {
      cases.forEach(item => assert.equal(item.output, utils.bigCamel(item.input)));
    });

  });
  describe('pascal', () => {
    const cases = [{
      input: 'testPage',
      output: 'test-page'
    }, {
      input: 'TestPage',
      output: 'test-page'
    }, {
      input: 'testPage1',
      output: 'test-page-1'
    }, {
      input: '123testPage',
      output: 'test-page'
    }, {
      input: '123TestPage',
      output: 'test-page'
    }, {
      input: '12%^)34TestPage12',
      output: 'test-page-1-2'
    }, {
      input: '**1234test12Page',
      output: 'test-1-2-page'
    }, {
      input: '##12@@34test&&Page',
      output: 'test-page'
    }, {
      input: 'test$12$page',
      output: 'test-1-2page'
    }, {
      input: 'testPage12$$$',
      output: 'test-page-1-2'
    }]
    it('case test', () => {
      cases.forEach(item => assert.equal(item.output, utils.pascal(item.input)));
    });
  });
});