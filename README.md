# Project 2

- By: Tofik Mussa
- Production URL: http://flashcard.tofikmussa.me/

## Pages summary

- LogIn Page _Takes the name of the player and date of birth. Stores the name of the player in local storge for later use. Redirects user to HomePage after that_

- Home Page _Lists 12 predefined categories the player can choose from in order to get a random word in that category_

- Game Page _This page is where the user plays the game and gets feedback on a correct or incorrect response. The correct answer will be displayed after 3 wrong attempts_

- Statistics Page _This page draws a graph of the count of losses vs wins. The data is persisted for a given user and the chart shows the comprehensive score_

- NavBar/Search _From anywhere in the application, the user can search a category from one in the list to redirected to a word game in that category. A friendly error message will be displayed if the category is not in the list_

## SFC summary

##### The pages and components closely allign with each other for unless some subtle differences

- LogIn Component _Used for registering as a player and have running scores kept_

- Home Component _Used for displaying list of categories_

- Game Component _This is where the actual game lies_

- Stats Component _Shows the history of running score to the user_

- NavBar Component _Shared among other components to navigate between pages and perform search functionality_

## Server interaction

##### Firebase is used for the following

- Registering a new user

- Updating the win/loss count of a user

- Retrieving win/loss count of a user

- Persisting list of categories in the seeding stage.

##### WordAPI is used for the following

- Pulling definitions for a randomly selected word in any of the categories

## Outside resources

The following references below have been used for a usccessful completion of the project

[Bootstrap Vue](https://bootstrap-vue.js.org/docs)

[Chart Js tutorial](https://alligator.io/vuejs/vue-chart-js/)

[Word API](https://www.wordsapi.com/)

[How to pass props through router link](https://forum.vuejs.org/t/passing-props-through-router-link-solved/16868)

[Named routes](https://router.vuejs.org/guide/essentials/named-routes.html)

[How to access prop value in a method](https://forum.vuejs.org/t/accessing-prop-value-in-created-method/26630)

[Loading different files from Vue webpack](https://stackoverflow.com/questions/43608457/how-to-import-functions-from-different-js-file-in-a-vuewebpackvue-loader-proje)

[Conditional rendering in a child component](https://stackoverflow.com/questions/41067378/watching-computed-properties)

[Firebase already initialized issue](https://github.com/zeit/next.js/issues/1999)

[Passing props with programmatic navigation](https://stackoverflow.com/questions/45151810/passing-props-with-programmatic-navigation-vue-js)

[How to update firbase collection](https://www.google.com/search?q=how+to+make+an+update+with+firbase+and+javascript&oq=how+to+make+an+update+with+firbase+and+javascript&aqs=chrome..69i57.11760j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_2fqlXo2zB8TEtQbC8YaQDg33)

[Passing data from parent to child via router](https://forum.vuejs.org/t/pass-data-from-parent-view-to-child-router-view/27926/4)

## Notes for instructor

### Vocabulary Quiz

##### The application is a guessing game of words based on the definitions provided. The application is integrated with third party APIs to pull defintions and the user is randomly assigned a word to play with from a list in firebase based on a category of choice.

- The running score is persisted for a given user. The user can select one of the 12 categories to play. Words will be randomly picked and definitions/hints are fetched from an external API.

- There is a search functionality for categories. It will display a friendly error message if the search criterion is not found

- A user can not submit answer again if he/she gets the correct answer or after 3 wrong attempts

- The definitions of the words is pulled from an external API called WordAPI. The words in play however are defined in firebase and there is a utility method for seeding firebase with categories/words in the section.

- The chart is drawn using chart js library.

- The user can navigate sometimes using the buttons for ease of use or a NavBar.

- Some components communicate using params in the router link. Local storage has also been used to centralize the storage of objects and simplify pulling data
