/* eslint-env jest */
const DB = require('../../src/models');

jest.mock('sequelize');

describe('Database setup', () => {
  describe('initialize()', () => {
    it('should authenticate and sync to database', async () => {
      await DB.initialize();
      expect(DB.sequelize.authenticate).toHaveBeenCalledTimes(1);
      expect(DB.sequelize.sync).toHaveBeenCalledTimes(1);
    });
  });
});
