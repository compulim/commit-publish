# Package template with CI/CD using Travis CI [![Build Status](https://travis-ci.org/compulim/commit-publish.svg?branch=master)](https://travis-ci.org/compulim/commit-publish)

## Objectives

We want to use Travis CI to build and publish packages to NPM to ensure the build is consistent and tested in a clean environment.

We want to use NPM [dist-tags](https://docs.npmjs.com/getting-started/using-tags) to encourage user to try out latest build, by simply running `npm install your-package@master`.

We want to make sure every official packages, not pre-releases, will be tagged by GitHub Release.

## Setup your package

### Update NPM token in `.travis.yml`

1. Run `npm token create` and write down the GUID token
2. Encrypt the token using Travis CLI
  * `docker pull caktux/travis-cli`
  * `docker run --rm caktux/travis-cli encrypt 12345678-1234-5678-abcd-12345678abcd -r your-org/your-repo`
3. Modify `.travis.yml`
  * Set `deploy.npm.api_key.secure` to the encrypted token
  * Set `deploy.npm.email` to your NPM email

### Update GitHub token in `.travis.yml`

1. On GitHub, create a personal access token with access to `repo`
2. Encrypt the token using Travis CLI
3. Modify `.travis.yml`
  * Set `deploy.releases.api_key.secure` to the encrypted token
  * Set `deploy.releases.email` to your NPM email

### Setup Travis CI

1. Enable Travis CI for your project
2. In project settings, enable "Build pushed branches"

## Deploy a release

We follow NPM standard steps to deploy a release.

1. Run `npm version 1.0.0`
2. Run `git push origin v1.0.0`, this only push to a new tag and not `master` branch

When Travis CI completed, you can verify by:

1. [GitHub Releases](../../releases) should show `1.0.0` release with binaries attached
2. Run `npm show your-package versions` should list `1.0.0`
3. Run `npm dist-tags ls your-package` should tag `1.0.0` as `latest`

After you deploy release `1.0.0`, you may want to prepare for the next pre-release immediately. Otherwise, your next push to `@master` will be tagged with `1.0.0-master` instead of `1.0.1-master`.

1. Run `npm version prepatch`
2. Run `git push`
