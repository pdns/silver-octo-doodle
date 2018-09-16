/* eslint-env jest */
const events = require('events');
const childProcess = require('child_process');
const { spawnPromise } = require('../../src/utils/promise-wrappers');

jest.mock('child_process');

describe('spawnPromise()', () => {
  let emitter;

  beforeEach(() => {
    emitter = new events.EventEmitter();
    emitter.stdout = new events.EventEmitter();
    emitter.stderr = new events.EventEmitter();
    childProcess.spawn.mockReturnValue(emitter);
  });

  afterEach(() => {
    childProcess.spawn.mockReset();
  });

  test('should call child_process.spawn()', async () => {
    const promise = spawnPromise('a', ['b']);
    emitter.emit('close', 10);

    await promise;
    expect(childProcess.spawn).toHaveBeenCalledTimes(1);
    expect(childProcess.spawn).toHaveBeenCalledWith('a', ['b']);
  });

  test('should return status/exit code on close', async () => {
    const promise = spawnPromise('a', ['b']);
    emitter.emit('close', 10);

    const retval = await promise;
    expect(retval).toBeDefined();
    expect(retval.status).toBe(10);
    expect(retval.stdout).toBe('');
    expect(retval.stderr).toBe('');
  });

  test('should return stdout and exit code on close', async () => {
    const promise = spawnPromise('a', ['b']);
    emitter.stdout.emit('data', '12');
    emitter.stdout.emit('data', '34');
    emitter.emit('close', 0);

    const retval = await promise;
    expect(retval).toBeDefined();
    expect(retval.status).toBe(0);
    expect(retval.stdout).toBe('1234');
    expect(retval.stderr).toBe('');
  });

  test('should return stderr and exit code on close', async () => {
    const promise = spawnPromise('a', ['b']);
    emitter.stderr.emit('data', '12');
    emitter.stderr.emit('data', '34');
    emitter.emit('close', 0);

    const retval = await promise;
    expect(retval).toBeDefined();
    expect(retval.status).toBe(0);
    expect(retval.stdout).toBe('');
    expect(retval.stderr).toBe('1234');
  });

  test('should reject on error', async () => {
    const promise = spawnPromise('a', ['b']);
    emitter.emit('error', 'REJECTED');

    await expect(promise).rejects.toThrow('REJECTED');
  });
});
