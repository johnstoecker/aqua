## Requirements

You need [Node.js](http://nodejs.org/download/) installed and you'll need
[MongoDB](http://www.mongodb.org/downloads) installed and running.

on Mac, run:
```bash
$ brew install node
$ brew install mongodb
```

## Installation

Ensure you have mongodb running (in a separate tab) with:
```bash
$ mongod
```

```bash
$ git clone git@github.com:johnstoecker/ironwagers.git
$ cd ironwagers
$ npm install
$ cp .env-sample .env
$ npm run first-time-setup
$ npm start
```

..and open up http://127.0.0.1:8000/

## Troubleshooting Installation

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing
secrets. If you have issues during installation related to `bcrypt` then [refer
to this wiki
page](https://github.com/jedireza/aqua/wiki/bcrypt-Installation-Trouble).

If the server crashes with 'unknow option: --inspect', your node version is
out of date. Upgrade to at least v7.10.0

## Kit's Area

Open up Iterm2:
1. In one tab:
```
sudo ~/Documents/personal/mongodb/bin/mongod
```
2. In another tab (cmd+t):
```
cd ~/projects/ironwagers
git pull
npm start
```
3. Open up Sublime Text 2. CSS can be edited in client/stylesheets/components.less
...
4. Once are happy with your changes, you can ctrl-c to shut down each tab. In the ironwagers folder, do a:
```
git status
git add client/stylesheets/components.less
git commit -m "CSS change -- giving tywin brown trousers"
git push
```
You can `git add` whatever other files you like.

## Technology

IronWagers is built off of Aqua:
Server side, Aqua is built with the [hapi](https://hapijs.com/) framework.
We're using [MongoDB](http://www.mongodb.org/) as a data store.

The front-end is built with [React](https://github.com/facebook/react). We use
[Redux](https://github.com/reactjs/redux) as our state container. Client side
routing is done with [React Router](https://github.com/reactjs/react-router).
We're using [Gulp](http://gulpjs.com/) for the build system.

## Configuration

Simply edit `config.js`. The configuration uses
[`confidence`](https://github.com/hapijs/confidence) which makes it easy to
manage configuration settings across environments. __Don't store secrets in
this file or commit them to your repository.__

__Instead, access secrets via environment variables.__ We use
[`dotenv`](https://github.com/motdotla/dotenv) to help make setting local
environment variables easy (not to be used in production).

Simply copy `.env-sample` to `.env` and edit as needed. __Don't commit `.env`
to your repository.__


## First time setup

__WARNING__: This will clear all data in the following MongoDB collections if
they exist: `accounts`, `adminGroups`, `admins`, `authAttempts`, `sessions`,
`statuses`, and `users`.

```bash
$ npm run first-time-setup

# > aqua@0.0.0 first-time-setup /home/jedireza/projects/aqua
# > node first-time-setup.js

# MongoDB URL: (mongodb://localhost:27017/aqua)
# Root user email: jedireza@gmail.com
# Root user password:
# Setup complete.
```


## Running the app

```bash
$ npm start

# > aqua@0.0.0 start /Users/jedireza/projects/aqua
# > gulp react && gulp

# [23:41:44] Using gulpfile ~/projects/aqua/gulpfile.js
# ...
```

Now you should be able to point your browser to http://127.0.0.1:8000/ and see
the welcome page.

[`nodemon`](https://github.com/remy/nodemon) watches for changes in server code
and restarts the app automatically. [`gulp`](https://github.com/gulpjs/gulp) and
[`webpack`](https://github.com/webpack/webpack) watch the front-end files and
re-build those automatically too.

We also pass the `--inspect` flag to Node so you have a debugger available.
Watch the output of `$ npm start` and look for the debugging URL and open it in
Chrome. It looks something like this:

`chrome-devtools://devtools/remote/serve_file/@62cd277117e6f8ec53e31b1be58290a6f7ab42ef/inspector.html?experiments=true&v8only=true&ws=localhost:9229/node`


## Running in production

```bash
$ node server.js
```

Unlike `$ npm start` this doesn't watch for file changes. Also be sure to set
these environment variables in your production environment:

 - `NODE_ENV=production` - This is important for many different optimizations,
   both server-side and with the front-end build files.
 - `NPM_CONFIG_PRODUCTION=false` - This tells `$ npm install` to not skip
   installing `devDependencies`, which we need to build the front-end files.


## Have a question?

If you see something, say something!

## Want to contribute?

Contributions are welcome.


## Running tests

[Lab](https://github.com/hapijs/lab) is part of the hapi ecosystem and what we
use to write all of our tests.

```bash
$ npm test

# > aqua@0.0.0 test /Users/jedireza/projects/aqua
# > lab -t 100 -S -T ./test/lab/transform -L --lint-options '{"extensions":[".js",".jsx"]}' ./test/lab/client-before.js ./test/client/ ./test/lab/client-after.js ./test/server/ ./test/lab/server-after.js ./test/misc/

#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ..................................................
#  ...............

# 865 tests complete
# Test duration: 6382 ms
# No global variable leaks detected
# Coverage: 100.00%
# Linting results: No issues
```


## License

MIT


## Don't forget

The Iron Bank will have its due.
