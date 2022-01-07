# Redux Project Guidelines

## Introduction

It's time to put those Redux fundamentals you've learned to work, and build your
first project! Your goal for this project is to **build a Redux application
based on a wireframe and a set of deliverables, following React and Redux principles.**


## Requirements

Your project should demonstrate your ability to do the following:

- Create a component hierarchy to represent a UI.
- Use the createStore() function provided by the Redux library to manage global state.
- Use the useSelector() and useDispatch() hooks provided by React-Redux to
  access and update the store.
- Implement all CRUD actions

A rubric is provided at the bottom of this document that outlines the criteria
by which your assignment will be evaluated.

## Project Brief

For this project, you'll be creating a React-Redux *Habit Tracker* frontend
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
- **Bonus:** See the current streak of a single habit's completion.

### Wireframes
<!-- 
As a rough guide for what the finished project should look like, here are some
wireframes:

![Wireframes](https://curriculum-content.s3.amazonaws.com/phase-2/react-tdd-project/react-tdd-project-wireframes.png)

- [Original wireframes](https://excalidraw.com/#json=X3xeHnsI3Nzk9mATEfvfV,zJtbepwBNSdeLwYhRzSNQg)

Styling isn't the focus of this project, and you're free to change the look and
feel as you like, so long as all the user stories are represented in your
application.

You should use these wireframes to determine what **routes** your application
will need, and to design your **component hierarchy** following the process from
[Thinking in React][thinking]. -->

## Setup

We have created some of the components for you. You will need to set up your
Redux store and connect the provided components as well as the components you
create to complete this project.

<!-- update this with links and commands -->
You will still need to add some dependencies, our curriculum covers
[React-Redux], [Redux], [Redux-Thunk] which we recommend using:

```console
$ npm install react-redux
```

<!-- > Note: make sure to include @5 at the end of the install command to install
> React Router version 5 instead of version 6. If you're curious to try out
> version 6, you can view information on the differences between v5 and v6 in
> [the docs][react router 6]. -->

<!-- ### Setup: MSW for Tests

Create React App comes with [Jest][jest] and [React Testing Library][rtl]
pre-configured, so you don't need to do any additional setup to start writing
tests for React components.

You will need to install [Mock Service Worker][msw] in order to mock API
requests for testing:

```console
$ npm install msw
```

Follow [this guide](https://mswjs.io/docs/getting-started/mocks/rest-api) for
configuring mocks for a REST API. -->

<!-- ## GitHub API

This project involves using the GitHub API to access data. The [GitHub API
docs][gh api] are an awesome resource for everything you'll need to build out
the user stories, but they can also be overwhelming to get started. Here's a
quick example of what you'll need to do to interact with the GitHub API.

One of the features you'll be building out is the ability to **search for
users** using the GitHub API. The documentation for this feature of the GitHub
API can be found here:

- https://docs.github.com/en/rest/reference/search#search-users

Take a look at the API documentation. What URL do we use to make the search? How
do we tell the GitHub API what user we're looking for?

The base URL for all API requests is `https://api.github.com`, and the endpoint
for searching users is `/search/users`. To provide a search term, we use a query
parameter `q`. All together, to search a user whose username includes "octo",
we'd make a request to the following URL:

- https://api.github.com/search/users?q=octo

In order to perform this search from your application, you'll need to make a GET
request from a React component, parse the response data, and use that data for
your component's state. Something like this:

```jsx
// search term is a dynamic prop
function SearchResults({ term }) {
  // state to hold the search results
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // initiate a request when the component mounts or the term changes
    fetch(`https://api.github.com/search/users?q=${term}`)
      .then((r) => r.json())
      .then((result) => setUsers(result.items));
  }, [term]);

  // render the results as JSX
}
```

### Endpoints

Here are all the important endpoints you'll need in order to build out the
remaining user stories:

- [`/search/users`](https://docs.github.com/en/rest/reference/search#search-users):
  search users using their GitHub username
- [`/users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user):
  get a user's profile information
- [`/users/{username}/repositories`](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user):
  list repositories for a user

### API Limitations

The GitHub API is free to use, and works without needing any authentication
(such as an API key). However, unauthenticated clients are limited to **60
requests per hour**. It's pretty easy to go over that limit as you're building
your application, so you may want to create an access token that you can use
with the API:

- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

**Important**: make sure not to include your API key in your project's source
code! To keep your API key safe, create a `.env.development.local` file and
store your key there while you are developing the application. The `.local`
environment files are intended not to be checked into source control, and are
included in the `.gitignore` file that comes with Create React App. Refer to
[this guide][create-react-app env] for information on working with API keys in
Create React App.

Note that even keys that aren't included in your source control may still be
included in the client-side code when you publish your project.
[This guide](https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/)
has information on using Netlify Functions to hide API keys. -->

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
