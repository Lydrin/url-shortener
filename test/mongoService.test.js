/* const sinon = require('sinon');
const mongoService = require('../routes/services/mongoService');

afterEach(() => {
  sinon.restore();
});

describe('read', () => {
  it('Should reject promise because database read failed', (done) => {
    const readStub = sinon.stub(collection, 'read');
    readStub.returns(Promise.reject())
    done();
  });
});
 */