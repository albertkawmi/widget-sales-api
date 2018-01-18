# widget-sales-api
A simple Express server that returns clients and sales of widgets. There's a [client app for it](https://widget-sales-react.now.sh/) which has its own GitHub repo: [widget-sales-react](https://github.com/albertkawmi/widget-sales-react).

## Dependencies

This project uses [Yarn](https://yarnpkg.com/en/) to manage dependencies. You can install Yarn via Homebrew on Mac:
```bash
brew update
brew install yarn 1.3.2
```
For other operating systems see the [Yarn installation docs](https://yarnpkg.com/lang/en/docs/install/#windows-tab).

Once Yarn is installed, you're ready to go:

```bash
git clone git@github.com:albertkawmi/widget-sales-api.git
cd widget-sales-api
yarn install
```

__NOTE__: Yarn creates a `yarn.lock` file, locking dependency versions so that installs run consistently across machines. At project start, latest stable version of Yarn was 1.3.2. If you have any problems installing or running dependencies, please try this version.

## Run locally `yarn dev`

For development, you can run a local server with `yarn dev`

This will listen on the default port 80 (which is probably undesirable). You can configure this in the `.env` file in root project directory:
```bash
echo PORT=4000 > .env
```
`.env` is `.gitignore`d so it will not be committed to source control. This  means you'll need to add it on each machine you work on.

After `yarn dev` Nodemon will listen for file changes and restart the local server automatically.

### Debugging
The `--inspect` flag is used to enable debugging. You can use Chrome Dev tools for this:

1. Start the dev server with `yarn dev`
2. Navigate to chrome://inspect
3. Click the 'inspect' link for your server under 'Remote Target'

A new window will open with the Chrome debugger.

### Run locally in production mode

`yarn dev` uses [Nodemon](https://github.com/remy/nodemon), debugging and sets the environment variable `NODE_ENV=development`. If you wish to test the server locally as if it were in production use:
```bash
yarn start
```

## Tests
[Jest](https://facebook.github.io/jest/) is used as a test runner and tests are written using the [Supertest](https://github.com/visionmedia/supertest) library. Supertest will run the app on port 4242 for testing (this is configurable in `package.json`).

The following commands are available:

* `yarn test` runs tests once
* `yarn test:watch` runs tests in watch mode for TDD
* `yarn test:coverage` runs tests once, with coverage report

## Code Linting

[ESLint](https://eslint.org/) is used for linting and can be configured in the `.eslintrc` file. Run `yarn eslint` to check from the command line (or use an ESLint plugin for your code editor).

`yarn eslint` will run before deployment.

## Deployment

[Zeit Now.sh](https://zeit.co/now) is used for cloud infrastructure and hosting. All Now deployments in their free plan will be given a subdomain with a hash under now.sh (see example link below). These URLs can be used as a staging step after local development.

For production, a friendly alias (without the hash) can be redirected to the new instance URL. This redirect means zero downtime. It also means deployments can be reverted by simply reassigning the alias to a previous instance.

### Staging
`yarn now:staging` will deploy the project to a URL like https://widget-sales-api-xxxxx.now.sh. You can create as many of these staging deployments as you like (within Now.sh's limits).

### Production
Use the command:
```bash
yarn deploy
```
This will run ESLint, run tests and finally it will run `yarn now:production`. This last step is like the `now:staging` command, but it points the project alias to the newly deployed instance.

The current alias is `widget-sales-api` which is connected to my credentials. You can modify this to anything you like in `package.json` and Now will allow you to deploy it (you may need to confirm your email address if it's your first time using Now, then it will store credentials on your machine.)

The current production URL is: https://widget-sales-api.now.sh

### Reverting
Since the deployment is simply an alias change, it is easy to revert:

1. Run `yarn now ls` to see a list of running instances
2. Copy the URL for the instance you wish to revert to
3. Run `yarn now alias the-new-instance-xxxxx.now.sh widget-sales-api`

__NOTE:__ if you are on the free plan of now.sh you can only have a few instances running concurrently. To remove instances, run the `yarn now ls` command and then use `yarn now rm the-instance-to-remove.now.sh` to destroy old instances.

## Related links

* [This API server in production](https://widget-sales-api.now.sh)
* [The client-side app in production](https://widget-sales-react.now.sh)
* [GitHub repo for the client-side app](https://github.com/albertkawmi/widget-sales-react)
* [My blog](http://kawmi.co)
* [Zeit Now.sh](https://zeit.co/now)
* [Express.js](http://expressjs.com/)
* [Jest](https://facebook.github.io/jest/)
* [Supertest](https://github.com/visionmedia/supertest)
* [Nodemon](https://github.com/remy/nodemon)
* [Yarn](https://yarnpkg.com/en/)
