# Dora [![Build Status](https://travis-ci.org/vbence86/giftassistant-client.svg?branch=master)](https://travis-ci.org/vbence86/giftassistant-client)
React Native Application to realise the client mobile app for the Dora Project

# Prerequisits

- XCode 
- Node and NPM. To install them on Mac type `brew install node`

# Install the development environment

- Clone the repository `git clone https://github.com/vbence86/giftassistant-client.git`
- Enter to the project folder `cd giftassistant-client`
- Install dependencies `npm install`
- Install react-native cli `npm install -g react-native-cli`

# Run the Application on Mac
- Enter to the project folder `cd giftassistant-client`
- Start development server `react-native run-ios`
- The app will open in the default simulator

# Naming

- All variables should be named with CamelCase
- All files should be named in lower-snake-case.  In the case of a file that export an object, 
the filename should be analagous to that of the exported object.  For instance, for an exported 
object named `MyAmazingComponent` one expect to find it exported from a file named \
`my-amazing-component.js`.  
- There are two exceptions to the above rule
  - meta files that have their own agreed-upon naming patterns, eg `.editorconfig`, `.gitignore`, 
  `README.md`
- The exception to the above rule, are to React components housed in the `components`, `providers` 
and `routes` src directories.  In this case the naming should appear as follows

```
└── src
    ├── components
    ├── helpers
    └── pages
```

- The distinction between different type of React elements is detailed as follows
  - `component` - These are functional components that are primarily used for rendering UI elements.  
  They should never directly manipulate state and should receive their data through `props` and 
  trigger behaviour in callbacks passed as `props`
  - `providers` - These are High-Order components that are responsible for external interactions and
   manage state.  More information on High-Order components can be found 
   [here](https://facebook.github.io/react/docs/higher-order-components.html) and 
   [here](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.we2lwik6w)
  - `routes` - These correspond with routes that are exposed to the routing subsystem.  Please note 
  that routes are not necessarily mapped 1:1 with URL slugs.  A route can be thought of as a page \
  template in the traditional web development sense.

# Code Style and Patterns

Please note that with the exception of API differences we do not 
distinugish between Node and Browser Javascript.

- We use Ecmascript 2015 extensively with the babel transpilitation system providing 
polyfills and transpilitation down to ES5 where appropriate.  Please do not add transpilitation 
plugins or presets for language features that have not been promoted to `Adopt` on the Architecture 
Team's technology radar.
- .editorconfig files are provided.  Please ensure your IDE is configued to use them
- Please don't write very long lines of codes.  Max line-width should be 100 characters.  Please 
configure your editor to show you rulers on 100 characters so you know where to break

## State management

- Design your state tree to be as flat as possible

## Functional programming

- Keep data immutable
- Write pure functions where possible
- Avoid creating a `class` unless you require inheritence
- Avoid using `this` where possible

# Dependencies

- We use Yarn to manage depedencies
- Use Yarn over NPM where possible since the `yarn.lock` file is responsibility for version control 
of dependencies


# Tests

## TDD

As an engineer writing the code for a story, you are expected to provide unit tests for any new 
functionality you provide.  A pull-request without sufficient Unit Test coverage will usually result 
in rejection of the PR.

## BDD

In the case of BDD, the gherkin-style Acceptance Criteria should be supplied as part of the User 
Story that it relates to. If this is missing then a story cannot be considered _READY_ and should 
not be accepted into a team backlog.  Please see the [Definition of Ready](#) for more information.

It will usually be up to a Test Engineer to implement the automation steps for BDD.  However, 
development engineers may be asked 
from time to time to provide assistance to this process.
