const { spawn } = require('child_process');

const spawnPromise = (cmd, args) => new Promise((resolve, reject) => {
  const [stdout, stderr] = [[], []];
  const process = spawn(cmd, args);

  process.stdout.on('data', (data) => {
    stdout.push(data);
  });
  process.stderr.on('data', (data) => {
    stderr.push(data);
  });
  process.on('error', (err) => {
    reject(err);
  });
  process.on('close', (code) => {
    resolve({
      status: code,
      stdout: stdout.map(b => b.toString()).join(''),
      stderr: stderr.map(b => b.toString()).join(''),
    });
  });
});

module.exports = { spawnPromise };
