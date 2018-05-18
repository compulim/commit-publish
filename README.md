# Package template with CI/CD using Travis CI

[![npm version](https://badge.fury.io/js/commit-publish-template.svg)](https://badge.fury.io/js/commit-publish-template) [![Build Status](https://travis-ci.org/compulim/commit-publish.svg?branch=master)](https://travis-ci.org/compulim/commit-publish)

## Objectives

We want to use Travis CI to build and publish packages to NPM to ensure the build is consistent and tested in a clean environment.

We want to use NPM [dist-tags](https://docs.npmjs.com/getting-started/using-tags) to encourage user to try out latest build, by simply running `npm install your-package@master`.

We want to make sure every official packages, not pre-releases, will be tagged by GitHub Release.

We depends on [`version-from-git`](https://npmjs.com/package/version-from-git) to bump package version based on Git branch/commit, like `1.0.0-master.1a2b3c4`.

## Setup your package

You will need to setup:

* [Your project](setup-your-project)
* [Travis CI](enable-travis-ci)
* [NPM token for publish](update-npm-token)
* [GitHub token for release](update-github-token)

### Setup your project

Download [`.travis.yml`](blob/master/.travis.yml) and save under your package.

```
curl -o .travis.yml https://raw.githubusercontent.com/compulim/commit-publish/master/.travis.yml
```

### Enable Travis CI

Enable Travis CI first so we can use the per-project public key to encrypt secrets.

1. Visit your [Profile page](https://travis-ci.org/profile) on Travis
2. Click "Sync account"
3. Enable Travis CI for your project

> Make sure "Build pushed branches" is enabled (by default)

> You may want to "Limit concurrent jobs" to 1 if you tend to push tags and commits quickly

### Update NPM token

NPM token is required to run `npm publish`.

1. Run `npm token create` and write down the GUID token
2. Encrypt the token thru this [webpage](https://travis-encrypt.github.io/)
3. Modify `.travis.yml`
   * Set `deploy.npm.api_key.secure` to the encrypted token
   * Set `deploy.npm.email` to your NPM email

> You can also use Docker image [`caktux/travis-cli`](https://hub.docker.com/r/caktux/travis-cli/) to do the encryption. Run `docker run --rm caktux/travis-cli encrypt 12345678-1234-5678-abcd-12345678abcd -r your-org/your-repo`

### Update GitHub token

GitHub token is required to create release automatically.

1. On GitHub, create a personal access token with access to `repo/public_repo` scope
2. Encrypt the token using Travis CLI
3. Modify `.travis.yml`
   * Set `deploy.releases.api_key.secure` to the encrypted token
   * Set `deploy.releases.email` to your NPM email

## Deploy a release

We follow NPM standard steps to deploy a release.

1. Run `npm version 1.0.0`
2. Run `git push origin v1.0.0`, this only push to a new tag and not `master` branch

You should see the following:

```
$ npm version 1.0.0
v1.0.0

$ git push origin v1.0.0
Counting objects: 5, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 494 bytes | 247.00 KiB/s, done.
Total 5 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/compulim/your-package.git
 * [new tag]         v1.0.0 -> v1.0.0
```

When Travis CI completed, you can verify by:

1. Visit [GitHub Releases](../../releases) should show `1.0.0` release with binaries attached
2. Run `npm show your-package versions` should list `1.0.0`
3. Run `npm dist-tags ls your-package` should tag `1.0.0` as `latest`

After you publish `1.0.0`, you may want to prepare for the next pre-release immediately. Otherwise, your next push to `@master` will be tagged incorrectly with `1.0.0-master.*`, instead of `1.0.1-master.*`.

1. Run `npm version prepatch --no-git-tag-version`, and inform npm not to tag prerelease version
2. Run `git commit -a -m "1.0.1-0"`
3. Run `git push`

```
$ npm version --no-git-tag-version 1.0.1-0
v1.0.1-0

$ git push
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/compulim/your-package.git
   a9c47a7..d053fa6  master -> master
```

# Contributions

Like us? [Star](https://github.com/compulim/commit-publish/stargazers) us.

Want to make it better? [File](https://github.com/compulim/commit-publish/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/commit-publish/pulls) a pull request.
