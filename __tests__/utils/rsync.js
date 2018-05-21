/* eslint-env jest */
const promiseWrappers = require('../../src/utils/promise-wrappers');
const { rsync } = require('../../src/utils/rsync');

jest.mock('../../src/utils/promise-wrappers');

describe('rsync()', () => {
  let args;

  beforeAll(() => {
    promiseWrappers.spawnPromise.mockReturnValue({
      status: 111,
      stdout: 'stdout',
      stderr: 'stderr',
    });
  });

  beforeEach(() => {
    args = {
      srcPath: 'SRC_PATH',
      srcHost: 'SRC_HOST',
      srcUser: 'SRC_USER',
      dstPath: 'DST_PATH',
      identityFile: 'ID_FILE',
    };
  });

  test('should call promise-wrappers.spawnPromise()', async () => {
    const expectedArgs = [
      '--protect-args',
      '--chmod=D755,F444',
      '-ltvrb',
      expect.stringMatching(/^--suffix=\.BAK_[0-9]+$/),
      '-e',
      'ssh -o StrictHostKeyChecking=no -i "ID_FILE" -p "22"',
      'SRC_USER@SRC_HOST:SRC_PATH',
      'DST_PATH',
    ];

    await rsync(args);
    expect(promiseWrappers.spawnPromise).toHaveBeenCalledTimes(1);
    expect(promiseWrappers.spawnPromise).toHaveBeenCalledWith('rsync', expectedArgs);
  });

  test('should return object with exitCode and output', async () => {
    const retval = await rsync(args);
    expect(retval).toBeDefined();
    expect(retval.exitCode).toBe(111);
    expect(retval.stdout).toBe('stdout');
    expect(retval.stderr).toBe('stderr');
  });

  test('should throw error without providing srcPath', async () => {
    delete args.srcPath;
    await expect(rsync(args)).rejects.toThrow();
  });

  test('should throw error without providing srcHost', async () => {
    delete args.srcHost;
    await expect(rsync(args)).rejects.toThrow();
  });

  test('should throw error without providing srcUser', async () => {
    delete args.srcUser;
    await expect(rsync(args)).rejects.toThrow();
  });

  test('should throw error without providing dstPath', async () => {
    delete args.dstPath;
    await expect(rsync(args)).rejects.toThrow();
  });

  test('should throw error without providing identityFile', async () => {
    delete args.identityFile;
    await expect(rsync(args)).rejects.toThrow();
  });
});
