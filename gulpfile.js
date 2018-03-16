const exec = require('gulp-exec');
const gulp = require('gulp');
const LastCommitLog = require('last-commit-log');
const { major, minor, patch } = require('semver');

const packageJSON = require('./package.json');

gulp.task('version-commit', async () => {
  const { TRAVIS_BRANCH } = process.env;
  const lastCommitLog = new LastCommitLog(__dirname);
  const log = await lastCommitLog.getLastCommit();
  const { version } = packageJSON;

  let nextVersion = `${ major(version) }.${ minor(version) }.${ patch(version) }`;

  if (TRAVIS_BRANCH === 'release') {
    console.log(`Release version: ${ version } -> ${ nextVersion }`);
  } else {
    nextVersion += `-${ process.env.TRAVIS_BRANCH }.${ log.shortHash }`;

    console.log(`Pre-release version: ${ version } -> ${ nextVersion }`);
  }

  return gulp
    .src('package.json')
    .pipe(exec(`npm --no-git-tag-version version ${ nextVersion }`));
});
