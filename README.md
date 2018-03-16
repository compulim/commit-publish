# commit-publish [![Build Status](https://travis-ci.org/compulim/commit-publish.svg?branch=master)](https://travis-ci.org/compulim/commit-publish)

My template for latest ES6 and CI/CD with Travis CI.

## Setup deployment

### Update NPM token in `.travis.yml`

1. Run `npm token create`
  * Write down the GUID token
2. Encrypt the token using Travis CLI
  * `docker pull caktux/travis-cli`
  * `docker run --rm caktux/travis-cli encrypt 12345678-1234-5678-abcd-12345678abcd -r your-org/your-repo`
3. Modify `.travis.yml`
  * Set `deploy.api_key.secure` to the encrypted token
  * Set `deploy.email` to your NPM email

### Setup Travis

1. In settings, enable "Build pushed branches"

## Release a deployment

1. `npm version 1.0.0`
2. `git push --tags`
