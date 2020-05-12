# Project 3

- By: Tofik Mussa
- Production URL: http://flashcard.tofikmussa.me/

## Pages summary

- **History Page** _This page is new to project 3. It displays correct answers and points assigned for all of the words that the user played. Points are assigned for a correct answer or three wrong attempts of guessing a word_

_ **History Fallback Page** \_If the user doesn't have any record of answers, this page will be displayed and user will be navigated back to play the game_

- **LogIn Page** _Takes the name of the player and date of birth. Does validation on name that it is not left blank and doesn't have any special characters. Does validation on age that user is at least 13. Stores the name of the player in local storge and invokes a method to store it in a database. Redirects user to HomePage after that_

- **Home Page** _Lists 12 predefined categories the player can choose from in order to get a random word in that category_

- **Game Page** _This page is where the user plays the game and gets feedback on a correct or incorrect response. The correct answer will be displayed after 3 wrong attempts. User gets a congratulations message for getting answer right and can continue playing_

- **Statistics Page** _This page draws a graph of the count of losses vs wins. The data is persisted for a given user and the chart shows the comprehensive score_

- **NavBar/Search ** _From anywhere in the application, the user can search a category from one in the list to redirected to a word game in that category. A friendly error message will be displayed if the category is not in the list_

## SFC summary

##### The pages and components closely allign with each other for unless some subtle differences

- **History Component** _This component is new and powered by state management to display the history of words and their assigned points for a given user_

- **LogIn Component** _Used for registering as a player and have running scores kept_

- **Home Component** _Used for displaying list of categories_

- **Game Component** _This is where the actual game lies_

- **Stats Component** _Shows the history of running score to the user_

- **NavBar Component** _Shared among other components to navigate between pages and perform search functionality_

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

[Validate form on a click](https://stackoverflow.com/questions/45984086/vuelidate-validate-on-click-not-when-field-touched)

[Custom Validation](https://jsfiddle.net/07cmjweb/)

[How to prevent validation on page load](https://github.com/vuelidate/vuelidate/issues/403)

[Mozilla Validation Documentation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

[Sub-error Vs any-error](https://vuelidate.js.org/#sub-error-vs-any-error)

[Bootstrap Vue](https://bootstrap-vue.js.org/docs)

[Variable is declared but never read](https://stackoverflow.com/questions/50011443/tslint-how-to-disable-error-somevariable-is-declared-but-its-value-is-never-rea)

[Calling a getter from another getter](https://stackoverflow.com/questions/46210109/how-do-i-call-a-getter-from-another-getter-in-vuex)

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

### The application is a guessing game of words based on the definitions provided. The application is integrated with third party APIs to pull defintions and the user is randomly assigned a word to play with from a list in firebase based on a category of choice. The user can play a difficulty level of their choosing and users must be at least 13 years of age to be able to play the game.

#### New items that were not part of project 2

- Users can select a difficulty level from easy to hard. A word will be randomly selected on a choosen diffculty level. 1, 3 and 5 points will be assigned for answering easy, medium, hard questions respectively. 0 points will be assigned for a question after 3 unsuccessful attempts. The
total points for a user will be calculated when navigating to the history page. In the history page, a correct answer for the questions played so far will be shown. If the user answered the question correctly, the history table will be marked and it will be marked for 3 wrong attempts. This feature is implemented using the VueX state management pattern. The entries for the table come from the state management store. Local storage is used to initially keep the name of the player in memory before persisting in database.

- Form validation is implemented in 2 pages, the log in page and the game page. In the log in page, name is a required field with no special characters and numericals. Users also must be at least 13 years of age which is calculated using the date of birth input field. In the game page, users can't submit a blank answer and also can't enter any special characters when playing the guessing game.

- There are fallback pages in 2 places, one is when there is no definition in the WordsAPI to a randomly selected word. There is also a fallback page for history if the user has not been record any right or wrong answers

#### Existing items from project 2

- The running score is persisted for a given user. The user can select one of the 12 categories to play. Words will be randomly picked and definitions/hints are fetched from an external API.

- There is a search functionality for categories. It will display a friendly error message if the search criterion is not found

- A user can not submit answer again if he/she gets the correct answer or after 3 wrong attempts

- The definitions of the words is pulled from an external API called WordAPI. The words in play however are defined in firebase and there is a utility method for seeding firebase with categories/words in the section.

- The chart is drawn using chart js library.

- The user can navigate sometimes using the buttons for ease of use or a NavBar.

- Some components communicate using params in the router link and state management is used for keeping record of past plays for a user. Local storage to initially store player names.
