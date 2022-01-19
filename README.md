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

Let's start by installing Redux Toolkit and React-Redux, which include all the
code needed for working with React and Redux together. If you need a refresher,
revisit
[this lesson](https://github.com/learn-co-curriculum/react-hooks-redux-toolkit).
`cd` into your app's directory and then run:

```console
$ npm install @reduxjs/toolkit react-redux
```

We also want to make sure we have `json-server` installed so we can persist data
in our habit tracker. Install it:

```console
$ npm install json-server
```

## Getting Started

Open up your project in your text editor to follow along with the next steps,
where we'll configure `json-server` and begin scaffolding the React application.

> **Note**: A completed version of the starter code is available in the
> `example-code` folder in this repository so you can compare your code when
> you've finished working through the setup instructions.

### Configuring `json-server`

To start, update the `scripts` section of the `package.json` file so you're able
to run your React application and `json-server` on separate ports:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "server": "json-server --watch db.json --port=4000",
    "build": "react-scripts build"
  }
}
```

In the root of your project, create a new file called `db.json`. This is where
our data will be stored. Add the following seed data to this file:

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

Finally, let's get the `json-server` running. Run the following in your console,
and then head to `http://localhost:4000/habits` in your browser.

```console
$ npm run server
```

In another terminal, run the following to get your project running:

```console
$ npm start
```

If all is well, you should see the React start up page on
`http://localhost:3000`, and the data from the `db.json` file served by
`json-server` on `http://localhost:4000/habits`.

### React-Redux Setup

To set up your Redux, we need to start with creating a store using
`configureStore` from Redux Toolkit. Create a new file called `store.js` in your
project's `src` directory, and add the following code:

```js
// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./features/habits/habitsSlice";

const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

export default store;
```

Now let's go ahead and connect our store to the `index.js` file. First we want
to make sure we have imported the `Provider` component from `react-redux`, as
well as our store, then pass the store to the `Provider`. When you're done, your
`index.js` should look like this:

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
store. Go ahead and create a new directory `/src/features/habits`, and inside of
the new directory create a new file called `habitsSlice.js`.

Add the following boilerplate code to `habitsSlice.js`:

```js
// src/features/habits/habitsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// save our base URL
const baseUrl = "http://localhost:4000/habits";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", () => {
  // return a Promise containing the data we want
  return fetch(baseUrl).then((response) => response.json());
});

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

Your app should be free of errors!

To verify that you can dispatch actions and access the store state, update the
`App` component as follows:

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "./features/habits/habitsSlice";

function App() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.entities);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return <div>There are {habits.length} habits in `db.json`</div>;
}

export default App;
```

Have a look at the above code and make sure you can follow the flow of
information from the components and Redux. How is our component communicating
with the server? What event is causing a network request to be made? How is our
component accessing the Redux store?

### Next Steps

Use the rubric below along with the user stories provided at the beginning of
this README to finish building out your Redux application.

## Submitting

In order to submit your project, you'll need to create a new GitHub repository
for your code following the guide below. Since you'll be using the existing code
from your local repository, **don't** check any of the boxes next to "Add a
README", "Add a .gitignore", or "Choose a license".

- [Create a repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

Once your repository is created, follow the instructions to push an existing
repository from the command line:

```console
$ git remote add origin git@github.com:your-name/your-repo-name.git
$ git branch -M main
$ git push -u origin main
```

It's recommended that you create a GitHub repository for your project and push
up your code often.

Once your work is done, submit a link to your GitHub repository in Canvas for
review.

## Rubric

Your assignment will be evaluated on a 1-4 scale for each of the following
criteria:

- **Create a store using Redux to manage global state.**

1. Does not successfully create a store using Redux.
2. Creates a store using Redux that includes an initial state as well as
   reducers for some, but not all, of the user stories defined in the
   deliverables (i.e. has a reducer to create and remove habits, but not update
   them).
3. Creates a store in Redux that has an initial state and reducers to handle all
   of the user stories.
4. Includes additional reducers for handling bonus deliverables.

- **Subscribe a component to changes in the Redux store state.**

1. Does not successfully subscribe a component to the Redux store.
2. Successfully subscribes a component to the Redux store using the
   `useSelector` hook, but does not follow best practices (i.e. returns more
   state than needed in the component), or does not use the `useSelector` hook
   in the appropriate components (i.e. only uses `useSelector` in one high-level
   component instead of throughout the component hierarchy).
3. Successfully subscribes components to the Redux store using the `useSelector`
   hook and follows best practices, only accessing the necessary state within
   each component that should be subscribed to the store.
4. Uses the `useSelector` hook to handle bonus deliverables.

- **Dispatch actions to update the Redux store state based on user events.**

1. Does not successfully dispatch actions to the Redux store.
2. Successfully dispatches at least one action to the Redux store, but does not
   dispatch actions for all the user stories (i.e. dispatches actions to create
   and remove habits, but not update them).
3. Successfully dispatches actions for all of the user stories.
4. Successfully dispatches actions to handle bonus deliverables.

- **Handle asynchronous actions such as API requests using Redux.**

1. Does not successfully handle asynchronous actions for API requests using
   Redux.
2. Successfully handles asynchronous actions for API requests using Redux, but
   does not follow best practices (i.e. doesn't handle different loading/error
   states), or does not handle asynchronous actions for all user stories (i.e.
   does not persist creating/updating/deleting habits).
3. Successfully handles asynchronous actions for API requests following best
   practices (i.e. handles different loading/error states) for all user stories.
4. Successfully handles asynchronous actions for bonus deliverables.
