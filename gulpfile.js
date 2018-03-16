const exec = require('gulp-exec');
const gulp = require('gulp');
const LastCommitLog = require('last-commit-log');
const packageJSON = require('./package.json');
const semver = require('semver');

gulp.task('commit-publish', async () => {
  console.log(process.env);

  const { TRAVIS_BRANCH, TRAVIS_PULL_REQUEST } = process.env;

  if (TRAVIS_BRANCH === 'master' && TRAVIS_PULL_REQUEST === 'false') {
    console.log('should NPM publish');
  }

  const lastCommitLog = new LastCommitLog(__dirname);
  const log = await lastCommitLog.getLastCommit();
  const { version } = packageJSON;
  const nextVersion = `${ semver.major(version) }.${ semver.minor(version) }.${ semver.patch(version) }-master.${ log.shortHash }`;

  console.log(`version: ${ version } -> ${ nextVersion }`);

  return gulp
    .src('package.json')
    .pipe(exec(`npm --allow-same-version --no-commit-hooks --no-git-tag-version version ${ nextVersion }`))
    // .pipe(exec('npm publish --tag=master'));
});
