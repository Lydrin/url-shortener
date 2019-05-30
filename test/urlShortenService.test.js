'use strict';

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const mongoService = require('../routes/services/mongoService');
const urlShortenService = require('../routes/services/urlShortenService');

chai.should();
chai.use(sinonChai);

const document = {
  url: 'http://mywebsite.com',
  hash: 'hash'
};

describe('Url shorten service : Read', () => {
  afterEach(() => {
    readStub.reset();
  });

  const readStub = sinon.stub(mongoService, 'read');
  it('Should reject promise because database read failed', (done) => {
    readStub.returns(Promise.reject(new Error('Une erreur s\'est produite lors de l\'accès en base')));
    urlShortenService.read({ hash: document.hash }).catch((err) => {
      const { message } = err;
      message.should.equal('Une erreur s\'est produite lors de l\'accès en base');
      done();
    });
  });

  it('Should resolve promise because read suceed', (done) => {
    readStub.returns(Promise.resolve(document));
    urlShortenService.read({ hash: document.hash }).then((returnedDoc) => {
      returnedDoc.should.deep.equal(document);
      done();
    })
  });
});

describe('Url shortren service : Write', () => {
  afterEach(() => {
    writeStub.reset();
  });
  const writeStub = sinon.stub(mongoService, 'write');
  it('Should reject promise because database read failed', (done) => {
    writeStub.returns(Promise.reject(new Error('Une erreur s\'est produite lors de l\'accès en base')));
    urlShortenService.write({ url: document.url }).catch((err) => {
      const { message } = err;
      message.should.equal('Une erreur s\'est produite lors de l\'accès en base');
      done();
    })
  })
})