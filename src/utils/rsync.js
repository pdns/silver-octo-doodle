const { spawnPromise } = require('./promise-wrappers');

const rsync = async (params) => {
  const {
    srcUser,
    srcHost,
    srcPath,
    dstPath,
    identityFile,
  } = params;

  if (!srcPath) throw new Error('missing srcPath');
  if (!srcHost) throw new Error('missing srcHost');
  if (!srcUser) throw new Error('missing srcUser');
  if (!dstPath) throw new Error('missing dstPath');
  if (!identityFile) throw new Error('missing identity file');
  const src = `${srcUser}@${srcHost}:${srcPath}`;
  const sshPort = 22;
  const backupSuffix = `.BAK_${Date.now()}`;

  const args = [
    '--protect-args',
    '--chmod=D755,F444',
    '-ltvrb',
    `--suffix=${backupSuffix}`,
    '-e',
    `ssh -o StrictHostKeyChecking=no -i "${identityFile}" -p "${sshPort}"`,
    src,
    dstPath,
  ];

  const result = await spawnPromise('rsync', args);

  return {
    exitCode: result.status,
    stdout: result.stdout.toString(),
    stderr: result.stderr.toString(),
  };
};

module.exports = { rsync };
