const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');
const Listr = require('listr');
const os = require('os');

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.write('\n');

const REPO_REGEX = /theboyWhoCriedWoolf\/react-express-boilerplate\.git/;
let clearRepo = true;

/**
 * start cleaning
 */
cleanRepo(() => {
  const tasks = new Listr([
    {
      title: chalk.cyan('Removing old repository'),
      skip: () => !clearRepo,
      task: () => () => fs.remove('.git/'),
    },
    {
      title: chalk.cyan('Installing dependencies...'),
      task: () => installDeps(),
    },
    {
      title: chalk.cyan('Cleaning up setup files'),
      task: () => deleteFileInCurrentDir('setup.js'),
    },
    {
      title: chalk.cyan('Updating package.json'),
      task: () => updatePackage(),
    },
    {
      title: chalk.cyan('Initialising new repository'),
      skip: () => !clearRepo,
      task: () => initGit(),
    },
  ]);

  tasks
    .run()
    .then(endProcess)
    .catch(message => {
      process.stderr.write(chalk.red.bold(message));
      process.stdout.write('\n');
      process.exit(1);
    });
});

/**
 * Checks if .git exists and if its been cloned from boilerplate
 * repositiory
 */
function isInGitRepository() {
  return new Promise(resolve => {
    fs.readFile('.git/config', 'utf8', (err, data) => {
      if (!err) {
        const isClonedRepo =
          typeof data === 'string' &&
          (data.match(/url\s*=/g) || []).length === 1 &&
          REPO_REGEX.test(data);

        resolve(isClonedRepo);
      }

      resolve(false);
    });
  });
}

/**
 * Deletes the .git folder in dir only if cloned from our repo
 */
function cleanRepo(callback) {
  process.stdout.write(chalk.cyan('Cleanup started...'));

  isInGitRepository().then(isInRepo => {
    if (isInRepo) {
      process.stdout.write(chalk.cyan('\nDo you want to clear old repository? [Y/n] '));
      process.stdin.resume();

      process.stdin.on('data', data => {
        const val = data.toString().trim();
        clearRepo = ['y', 'Y', ''].includes(val);
        callback();
      });
    } else {
      callback();
    }
  });
}

function checkNodeVersion(err, stdout, reject) {
  const nodeVersion = stdout && parseFloat(stdout.substring(1));
  const message =
    err || 'Unsupported node.js version, make sure you have the latest version installed.';
  if (nodeVersion < 5 || err) {
    reject(message);
  }
}

/**
 * Installs dependencies
 */
function installDeps() {
  return new Promise((resolve, reject) => {
    exec('node --version', (err, stdout, stderr) => {
      checkNodeVersion(err, stdout, reject);

      const onComplete = error => {
        return error ? reject(error) : resolve();
      };

      exec('yarn --version', (err, stdout, stderr) => {
        if (parseFloat(stdout) < 0.15 || err || process.env.USE_YARN === 'false') {
          exec('npm install --silent', onComplete);
        } else {
          exec('yarn install --silent', onComplete);
        }
      });
    });
  });
}

/**
 * Initializes git again
 */
function initGit() {
  return new Promise(resolve => {
    exec('git init && git add . && git commit -m "Initial commit"', resolve);
  });
}

/**
 * Function which ends setup process
 */
function endProcess() {
  process.stdout.write(chalk.green.bold('\nDone!\n\n'));
  process.exit(0);
}

/**
 * Deletes a file in the current directory
 */
function deleteFileInCurrentDir(file) {
  return fs.unlink(path.join(__dirname, file));
}

/**
 * Updates package.json removing setup method
 */
function updatePackage() {
  const appPath = path.resolve(process.cwd());
  const pkg = require(path.join(appPath, 'package.json'));

  delete pkg.scripts.setup;
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL,
  );
}
