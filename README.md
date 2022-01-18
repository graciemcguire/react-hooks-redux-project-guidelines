# Redux Project Guidelines

## Introduction

It's time to put those Redux fundamentals you've learned to work, and build your
first project! Your goal for this project is to **build a Redux application
based on a wireframe and a set of deliverables, following React and Redux
principles.**

## Requirements

Your project should demonstrate your ability to do the following:

- Create a component hierarchy to represent a UI.
- Use the configureStore() function provided by the Redux toolkit to manage
  global state.
- Use the useSelector() and useDispatch() hooks provided by React-Redux to
  access and update the store.
- Implement all CRUD actions

A rubric is provided at the bottom of this document that outlines the criteria
by which your assignment will be evaluated.

## Project Brief

For this project, you'll be creating a React-Redux _Habit Tracker_ frontend
application. You must build features that complete the following **user
stories**:

As a user, I can…

- CRUD individual habits
  - Create a new habit.
  - See all of my habits in a list form.
  - Update a habit.
  - Remove a habit.
- Complete a daily habit.
- **Bonus:** See the % of total habits completed.
- **Bonus:** Implement testing into the project

## Wireframes

As a rough guide for what the finished project should look like, here are some
wireframes:

![Wireframes](https://curriculum-content.s3.amazonaws.com/phase-4/redux-project-wireframes/habit-tracker-wireframe.png)

- [Original wireframes](https://excalidraw.com/#json=iPzOrUiaL6geXoDYRankp,LJmQXoSfXIk7TMNhBLg00g)

Styling isn't the focus of this project, and you're free to change the look and
feel as you like, so long as all the user stories are represented in your
application.

You should use these wireframes to design your **component hierarchy** following
the process from [Thinking in React][thinking].

## Setup

You will start your app from scratch, but we will help provide some of the
boilerplate code to get you started in a little bit. Start by creating a new
react app by running the following:

```console
$ npx create-react-app <your-app-name>
```

Let's start by installing Redux Toolkit, which includes all the code needed for
working with React and Redux together. If you need a refresher, revisit
[this lesson](https://github.com/learn-co-curriculum/react-hooks-redux-toolkit).
CD into your app's directory and then run:

```console
$ npm install @reduxjs/toolkit
```

We also want to make sure we have `json-server` installed so we can persist data
in our habit tracker. Install it:

```console
$ npm install json-server
```

## Getting Started

To set up your Redux, we need to start with creating a store using
`configureStore` from the redux toolkit. Create a new file, `store.js` in your
project's `src` directory, and add the following code:

```js
// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./features/habitsSlice";

const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

export default store;
```

Now let's go ahead and connect our store to the `index.js` file. First we want
to make sure we have imported the Provider from `react-redux`, as well as our
store, then pass the store provider. When you're done your `index.js` should
look like this:

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Now you're probably getting a ton of errors from our missing reducer in our
store. Go ahead and create a new directory `/src/features`, and inside of the
new directory create a new file called `habitsSlice.js`.

Add the following boilerplate code to `habitsSlice.js`:

```js
// src/features/habitsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// save our base URL
const baseUrl = "http://localhost:3000/habits";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", () => {
  // return a Promise containing the data we want
  return fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => data);
});

// export const habitsSlice = createSlice({)}

const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    entities: [], // array of habits
    status: "idle", // loading state
  },
  reducers: {
    // add your reducers here
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchHabits.pending](state) {
      state.status = "loading";
    },
    [fetchHabits.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export default habitsSlice.reducer;
```

Your app should be free of errors, and you should be able to see your initial
state in the store using the Redux devtools! The final piece missing is your
database. In the root of your project, create a new file called `db.json`. This
is where our data will be stored. Add the following seed data to this file:

```json
{
  "habits": [
    {
      "id": "1",
      "title": "code everyday",
      "days": {
        "sunday": false,
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false
      }
    },
    {
      "id": "2",
      "title": "read for 30 minutes",
      "days": {
        "sunday": false,
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false
      }
    }
  ]
}
```

Finally, let's get the json-server running. Run the following in your console,
and then head to `http://localhost:3000/habits` in your browser.

```console
$ json-server --watch db.json
```

In another terminal, run the following to get your project running:

```console
$ npm start
```

If all is well, you should see the React start up page on
`http://localhost:3002`, and the initial seed data on
`http://localhost:3000/habits`.

Use the rubric below, along with the user stories provided at the beginning of
this README to finish building out your Redux Application.

<!-- ## Rubric

Your assignment will be evaluated on a 1-4 scale for each of the following
criteria:

- **Create a component hierarchy to represent a UI**

1. Did not manage to render everything required by the user stories.
2. Renders everything that is user stories, but doesn't have features cleanly
   separated into separate components (i.e. no strong separation of concerns
   between components).
3. Renders everything that is asked for in the deliverables. Components are
   abstract/reusable. No unnecessary components were created.
4. Additional components created to complete one or more bonus deliverables.

- **Manage state in a React application**

1. Does not have all the necessary state to achieve the functionality required
   by the user stories.
2. Has all the necessary state required by the user stories, but is not managing
   state following best practices (i.e. state is duplicated between components;
   state is held higher in the component tree than it should be; state not being
   updated following user events).
3. Has all the necessary state required by the user stories. State is not
   duplicated and is held at the appropriate components in the component
   hierarchy. State is successfully updated in response to user events.
4. Uses state successfully to complete one or more bonus deliverables.

- **Interact with an API from a React application**

1. Does not use the API successfully to achieve the functionality required by
   the user stories.
2. Is able to interact with the API successfully, but is not following best
   practices (i.e. incorrect use of `useEffect` and the dependencies array;
   incorrect syntax for `fetch`/network request code; not handling loading state
   when waiting for API response).
3. Uses the API successfully to achieve the functionality required by the user
   stories, following best practices.
4. Uses additional features of the API to successfully complete one or more
   bonus deliverables.

- **Create client-side routes using React Router and display different
  components based on URL navigation**

1. Does not use React Router to achieve the functionality required by the user
   stories.
2. Is able to use React Router, but is missing some components (i.e. not able to
   use a `<Link>` component with a `<Route>` component; not able to use
   `useParams` to get data from URL params).
3. Uses React Router successfully to achieve the functionality required by the
   user stories, and demonstrates the ability to use the `<BrowserRouter>`,
   `<Link>`, `<Route>`, and `<Switch>` components and the `useParams` hook.
4. Uses React Router to successfully complete one or more bonus deliverables.

- **Follow a test-driven development process to writing React code, including
  unit tests for individual components as well as integration tests for
  component hierarchies**.

1. Few or no tests present in the completed application.
2. Has tests present, but tests don't cover all of the functionality required by
   the user stories. Not able to perform advanced tests, such as working with an
   API or testing components that use React Router.
3. Has tests for all the functionality required by the user stories. Tests are
   present for both individual components as well as larger component
   hierarchies. Performs tests that make requests to an API, and tests
   components that use React Router.
4. Has tests coverage for one or more bonus deliverables. -->

<!-- ## Resources

- [Create React App][create-react-app]
- [React Router 5][react router 5]
- [React Testing Library][rtl]
- [Jest][jest]
- [Mock Service Worker][msw]
- [GitHub API][gh api]

[thinking]: https://reactjs.org/docs/thinking-in-react.html
[create-react-app]: https://create-react-app.dev/
[create-react-app env]:
  https://create-react-app.dev/docs/adding-custom-environment-variables/
[msw]: https://mswjs.io/
[react router 5]: https://v5.reactrouter.com/
[react router 6]: https://reactrouter.com/docs/en/v6/upgrading/v5
[gh api]:
  https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api
[rtl]: https://testing-library.com/docs/react-testing-library/intro
[jest]: https://jestjs.io/ -->
