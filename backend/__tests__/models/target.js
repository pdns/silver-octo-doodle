/* eslint-env jest */
jest.mock('../../src/models');
jest.mock('sequelize');
const DB = require('../../src/models');

DB.sequelize.define.mockReturnValue({});
const Target = require('../../src/models/target');

describe('Host models', () => {
  it('should not have any duplicate or undefined statuses', () => {
    const existingValues = {};
    Object.values(Target.statuses).forEach((v) => {
      expect(v).toBeDefined();
      expect(v.value).toBeDefined();
      expect(existingValues[v.value]).toBeUndefined();
      existingValues[v.value] = v.value;
    });
  });
});
