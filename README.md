# Dialtone Combinator

Dialtone Combinator is a component that provides an interface for users to interact with Dialtone Vue components. 

## Features

* Interactive option bar for component customization
* Live render preview of component with selected options
* Live code preview for component with selected options

## Documentation

[Overview](.github/documentation/OVERVIEW.md) \
[Contributing](.github/documentation/CONTRIBUTING.md) \
[Usage](.github/documentation/USAGE.md)

## Environment

### Install

`git clone https://github.com/dialpad/dialtone-combinator.git`

OR

`git clone git@github.com:dialpad/dialtone-combinator.git`

The authorization token for the dialtone-vue package is needed.
Create a file named '.npmrc' in the root of the project with the following content:
```
//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}
```

Add an environment variable name NPM_AUTH_TOKEN with the dialtone-vue auth token value.
Make sure to 'source' the new environment variable

```
source TOKEN_PATH
```

Install dependencies

```
npm i
```

### Run

`npm run dev`

## Links

[Preview](https://dialpad.github.io/dialtone-combinator/) \
[Tracker](https://dialpad.atlassian.net/browse/DT-531) \
[Dialtone](https://github.com/dialpad/dialtone) \
[Dialtone Vue](https://github.com/dialpad/dialtone-vue)