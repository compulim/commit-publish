const exec = require('gulp-exec');
const gulp = require('gulp');
const LastCommitLog = require('last-commit-log');
const packageJSON = require('./package.json');
const semver = require('semver');

gulp.task('version-commit', async () => {
  console.log(process.env);

  const { TRAVIS_BRANCH } = process.env;
  const lastCommitLog = new LastCommitLog(__dirname);
  const log = await lastCommitLog.getLastCommit();
  const { version } = packageJSON;
  const nextVersion = `${ semver.major(version) }.${ semver.minor(version) }.${ semver.patch(version) }-${ TRAVIS_BRANCH }.${ log.shortHash }`;

  console.log(`version: ${ version } -> ${ nextVersion }`);

  return gulp
    .src('package.json')
    .pipe(exec(`npm --allow-same-version --no-commit-hooks --no-git-tag-version version ${ nextVersion }`));
});
