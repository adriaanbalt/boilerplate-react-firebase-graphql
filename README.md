# React, Apollo GraphQL, and Firebase for auth, storage, analytics.

This boilerplate is the foundation for a marketplace application. Users can create accounts, add products they own to their collection.

## Technical Structure

-   React + Redux to manager UI state
-   Firebase cloud function hosts GraphQL server
-   Apollo is integrated into React
-   Heroku hosts the frontend & backend
-   Firebase Firestore hosts the database
-   Firebase Auth handles authentication
-   Yarn workspaces divides the app between frontend and backend to help manage dependencies
-   Lunr Search

## ToDo

-   i18n helper to make the hard coded copy easier to translate
-   Add analyzer to review bundle sizes
-   Convert to use Typescript

## Dependencies

-   NODE 10.18.1 because (at the time) this was the maximum node version allowed by Google Cloud Platform.

## Installation steps

1.  Install [VS Code IDE](https://code.visualstudio.com) (optional, you can use an IDE of choice but we used VSCode while building this app)
2.  Install [iTerm2](https://www.iterm2.com) (optional, convenient way to style your terminal)
3.  Install [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH) (optional, lets you easily style your terminal)
4.  Install [Homebrew](https://brew.sh)
5.  Install [NVM](https://github.com/nvm-sh/nvm)

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

6.  Install NVM continued: Update `~/.zshrc` (this may happen automatically)

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

7.  Install NODE using NVM

```
$ nvm install 10.18.1
$ nvm use 10.18.1
```

8.  Install [Yarn](https://yarnpkg.com/lang/en/) using Homebrew `$ brew install yarn`
9.  Install [Firebase CLI](https://firebase.google.com/docs/cli) `$ npm install firebase -g` `$ npm install -g firebase-tools`
10. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) using Homebrew `$ brew tap heroku/brew && brew install heroku`
11. Install [Apollo CLI](https://www.npmjs.com/package/apollo) `$ yarn global add apollo`
12. Install [VS Code Apollo](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)
13. Clone the repo `$ git clone git@github.com/adriaanbalt/boilerplate-react-firebase-graphql.git`
14. Install dependencies from the app directory (boilerplate-react-firebase-graphql/app) `yarn run install`

## Local Development

1. Make sure you are using the correct node version `$ nvm use 10.18.1`
2. Make sure you are logged into our private Firebase account development account `$ firebase login`
3. In another terminal window, start the local backend development server `$ yarn run backend-start`
4. In one terminal window, start the local frontend development server `$ yarn run frontend-start`
5. Open browser to [http://localhost:3000](http://localhost:3000) (this will happen automatically)
6. API GraphQL "emulator" server will be hosted at [http://localhost:5000](http://localhost:5000)
   Note: Local development is connected to production database and storage on Firebase! (add item local, item is also in prod)

## Deployment

To update the production app both the frontend and backend must be on the server. To make this easy, there is one terminal command that updates both:
`$ yarn deploy`

#### What is this doing under the hood?

1. Merge to the frontend code to the `master` branch

```
$ git add .
$ git commit -m 'YOUR CUSTOM COMMIT MESSAGE HERE'
$ git push origin master
```

2. Check that the environments are building
   [Frontend Activity Monitor](https://dashboard.heroku.com/apps/boilerplate-react-firebase-graphql-frontend/activity)
   [Frontend Activity Monitor](https://dashboard.heroku.com/apps/boilerplate-react-firebase-graphql-backend/activity)

3. Deploy the GraphQL Mutation and Query node js files

From the `packages/backend` folder run this command

```
$ firebase deploy --only functions
```

This will deploy the `api` function which will update the backend requests on the Google Cloud server.

## Local setup (this is being worked on)

#### Setup apollo

`$ npx apollo service:push --endpoint=http://localhost:5000`

#### Connect local environment to Firebase (from within project directory)

`$ firebase use --add fireplay-app`

`$ firebase setup:emulators:firestore`

`$ firebase emulators:start --only firestore // starts firestore local environment`

#### Note: make sure your yarn workspaces are setup correctly (see below)

# Environment Setup

-   Note: this has been completed but is here for reference should anything need adjustment

### Enable yarn workspaces experimentation mode globally

Note: this may not be necessary but the documenation includes it.

`$ yarn config set workspaces-experimental true`

Useful links:

-   https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/
-   https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/

### Create a yarn workspace folder structure:

```
root
├── package.json
├── packages
│   ├── backend
│   │   ├── package.json
│   ├── frontend
│   │   ├── package.json
└── yarn.lock
```

#### Update root/package.json as follows

-   Note: Node version 8 is specifically so we can use Firebase Cloud Functions. Otherwise this warning will be triggered: `'Warning, FIREBASE_CONFIG and GCLOUD_PROJECT environment variables are missing. Initializing firebase-admin will fail'` [reference](https://stackoverflow.com/questions/54292448/warning-firebase-config-environment-variable-is-missing-initializing-firebase)
-   Note: workspace modules package.json files must also be set to the same node version.
-   `$ nvm use 10.18.1`

```
{
  "private": true,
  "name": "boilerplate-react-firebase-graphql",
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  },
  "engines": {
    "node": "8.*"
  }
}
```

#### Test to make sure it's setup correctly

`$ yarn workspaces info`

##### Should see something like this:

```
{
  "boilerplate-react-firebase-graphql-frontend": {
    "location": "packages/frontend",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "boilerplate-react-firebase-graphql-backend": {
    "location": "packages/backend",
    "workspaceDependencies": [
      "boilerplate-react-firebase-graphql-frontend"
    ],
    "mismatchedWorkspaceDependencies": []
  }
}
```

### GraphQL mutation

1. Update frontend with request

-   open packages/frontend/src/graphql/requests.js
-   Create a new constant variable like below

```
export const NAME_OF_MUTATION = gql`
    mutation NameOfMutation( $propertyToPass: DataType! ) { // using ! means that this property is required
        NameOfMutation( propertyToPass: $propertyToPass ) {
            propertyToPass,
        }
    }
`;
```

-   Make sure "NameOfMutation" is the same as the next step

2. Update resolver and schema in backend

-   open packages/backend/src/resolvers.js
-   inside the "mutation" property create a new function like below

```
NameOfMutation: async (_, data) => {
    try {
        // update database
        const newDbObjId = await admin
            .firestore()
            .collection('CollectionName')
            .add(data)
            .then( (docRef) => {
                return docRef.id
            })
            .catch( (error) => {
                console.error("[addTransaction] Error adding document: ", error);
            })

        return objectAssignDeep({}, { id: newDbObjId }, data)
    } catch (error) {
        throw new ApolloError(error);
    }
},
```

-   open packages/backend/src/schema.js

### Create 2 Heroku apps (1 for frontend, 1 for backend)

#### frontend

1. Create Heroku app using [CLI](https://devcenter.heroku.com/articles/creating-apps)

```
$ cd packages/frontend
$ heroku create boilerplate-react-firebase-graphql-frontend
$ heroku apps // check if the app installed (you should see a list of apps including one named boilerplate-react-firebase-graphql-frontend
```

2. We are using [Create React App](https://github.com/facebook/create-react-app) aka "CRA"

```
$ cd packages/frontend
$ npx create-react-app .
$ yarn start // check if the app starts (this should open a browser to localhost:3000)
```

3. Install buildpacks

-   [heroku-buildpack-multi-procfile](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile)

```
$ heroku buildpacks:add -a boilerplate-react-firebase-graphql-frontend https://github.com/heroku/heroku-buildpack-multi-procfile
$ heroku buildpacks --app boilerplate-react-firebase-graphql-frontend // check to make sure the buildpack installed
```

4. Setup config variables

```
$ heroku config:set PROCFILE=/packages/frontend/Procfile --app boilerplate-react-firebase-graphql-frontend
$ heroku config:set BUILD_ENV=frontend --app boilerplate-react-firebase-graphql-backend
```

5. Create root/static.json

-   Enables deep linking for the router on Heroku

```
{
    "root": "packages/frontend/build/",
    "clean_urls": false,
    "routes": {
        "/**": "index.html"
    }
}
```

#### backend

1. Create Heroku app using [CLI](https://devcenter.heroku.com/articles/creating-apps)

```
$ cd packages/backend
$ heroku create boilerplate-react-firebase-graphql-backend
$ heroku apps // check if the app installed (you should see a list of apps including one named boilerplate-react-firebase-graphql-backend
```

2. Create buildpacks for backend

-   [heroku-buildpack-multi-procfile](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile)

```
$ heroku buildpacks:add -a boilerplate-react-firebase-graphql-backend https://github.com/heroku/heroku-buildpack-multi-procfile
$ heroku buildpacks --app boilerplate-react-firebase-graphql-backend // check to make sure the buildpack installed
```

3. Setup config variables

-   [How to get APOLLO_ENGINE_API_KEY](https://www.apollographql.com/docs/apollo-server/deployment/heroku/#configuring-environment-variables)

```
$ heroku config:set PROCFILE=/packages/backend/Procfile --app boilerplate-react-firebase-graphql-backend
$ heroku config:set BUILD_ENV=backend --app boilerplate-react-firebase-graphql-backend
$ heroku config:set APOLLO_ENGINE_API_KEY={GET FROM APOLLO} --app boilerplate-react-firebase-graphql-backend
```

### Update root/package.json so Heroku build the code

-   Note: this runs both the frontend and backend build scripts within the heroku server
-   Note: `bash` may not be required
-   Note: `./scripts/` is required to run this command because of how permissions are setup globally on Heroku

```
"scripts": {
    "heroku-postbuild": "bash ./scripts/heroku.build",
}
```

### Setup Sub domain

1. Add domain to heroku project, [reference](https://devcenter.heroku.com/articles/custom-domains#configuring-dns-for-subdomains)

```
$ cd packages/frontend
$ heroku domains:add -a boilerplate-react-firebase-graphql-frontend app.{your-domain}.com --remote prod
```

2. Copy generated DNS target

```
$ heroku domains --app boilerplate-react-firebase-graphql-frontend
```

3. Login to GoDaddy
4. Go to [DNS Management](https://dcc.godaddy.com/manage/dns?domainName={your-domain}.com)
5. Create CNAME record in DNS manager with desired subdomain (in our case 'app' or 'api' in the case of the backend)
6. Paste generated DNS target in the GoDaddy's CNAME record created in the previous step, [reference](https://www.godaddy.com/help/add-a-cname-record-19236)

### Final Folder Structure

```
root
├── package.json
├── static.json // used by CRA
├── packages
│   ├── frontend
│   │   ├── package.json
│   │   ├── Procfile
│   ├── backend
│   │   ├── package.json
│   │   ├── Procfile
├── scripts // must be within this folder otherwise heroku will not give permission to run it
│   ├── heroku.build // used by heroku-postbuild step (see ${root}/package.json)
└── yarn.lock // you need this for Heroku to run YARN otherwise it will run NPM by default
```

## Cloud Functions

-   Deployment

From the `packages/backend` folder run this command

```
$ firebase deploy --only functions
```

-   List of Cloud Functions

#### 1. api

This is where the GraphQL server is hosted.

#### 2. processSignUp

When a new user is created, we need to update the Firestore database with user credentials. This _appears_ to be the only way to store the `uid` from the "authentication" tab in Firebase console.

#### 3. storageOnChange

This function only logs a statement that an object on storage has changed. The callback includes a reference to the object.

## Debugging

-   See what is happening on the server

```
$ heroku logs --tail --app boilerplate-react-firebase-graphql-frontend // or boilerplate-react-firebase-graphql-backend
```

-   Deploying to the Heroku remote will show you what is happening on the server in your terminal. You can also see this in the Activity dashboard if you login to Heroku ie [https://dashboard.heroku.com/apps/boilerplate-react-firebase-graphql-frontend/activity](https://dashboard.heroku.com/apps/boilerplate-react-firebase-graphql-frontend/activity). Keep in mind this is applicable to both frontend and backend applications.

```
$ git push heroku-frontend master
```

-   Graph QL errors can happen. When they do, look at the Network tab in your Browser's Dev Inspector to find the broken request. You will find more information about the error there.

## How to run the app

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Files and Folders explanation

-   `/globalStyles` is where universal files are located. They are loaded into /index.scss which does not include `module` in its name so it does not act like a css module.
-   React directives can be found in the `/components` folder, including the screens themselves as their helper directives like `Search` or `DropDown`
-   There is an analytics middleware that is able to catch each action that is performed. As you can see in that file, some actions have been chosen to dispatch analytics events to the server (there is no server but this is where that functionality would exist)
-   Using HOC to have inheritance between the screens, which helps with the animations as well as the responsiveness of the app. If I had more time I would further flesh out the animations.
-   The data is stored within the `reducers` folder and is combined together in the `Store.js` file.
-   Selectors are used to memoize and quickly retrieve state.
-   Actions are available across the app located in the `actions` folder.

## Strange things

-   There is a warning from router but the creators of React Router haven't fixed it yet, not sure why that is the case. [See more here](https://github.com/ReactTraining/react-router/issues/6382)

https://www.apollographql.com/blog/graphql-file-uploads-with-react-hooks-typescript-amazon-s3-tutorial-ef39d21066a2/
https://dev.to/rajvirtual/an-intro-to-apollo-graphql-with-react-hooks-and-context-api-1gb3
