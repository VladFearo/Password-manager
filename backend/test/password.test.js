const { expect } = require('chai');
const sinon = require('sinon');
const Password = require('../models/Password');
const { encryptData } = require('../utils/encryption');
const passwordController = require('../controllers/password');

/**
 * Test suite for the Password Controller.
 * It uses Mocha and Chai for testing, and Sinon for stubbing and restoring functions.
 */
describe('Password Controller', () => {
  beforeEach(() => {
    // Restore any stubbed functions before each test
    sinon.restore();
  });

  /**
   * Test suite for the deletePassword function.
   */
  describe('deletePassword', () => {
    /**
     * Test case: should delete a password successfully.
     */
    it('should delete a password successfully', async () => {
      // Mock the request and response objects
      const req = { params: { id: 'passwordId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Stub the findByIdAndDelete method of the Password model to resolve
      sinon.stub(Password, 'findByIdAndDelete').resolves();

      // Call the deletePassword function
      await passwordController.deletePassword(req, res);

      // Assert the response status and message
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Password deleted successfully' })).to.be.true;
    });

    /**
     * Test case: should handle errors when deleting a password.
     */
    it('should handle errors when deleting a password', async () => {
      // Mock the request and response objects
      const req = { params: { id: 'passwordId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Stub the findByIdAndDelete method of the Password model to reject with an error
      sinon.stub(Password, 'findByIdAndDelete').rejects(new Error('Error deleting password'));

      // Call the deletePassword function
      await passwordController.deletePassword(req, res);

      // Assert the response status and message
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Server error' })).to.be.true;
    });
  });
});
