# Project 2

- By: Tofik Mussa
- Production URL: http://flashcardtofikmussa.me/

## Pages summary

_List the "pages" of your application_

## SFC summary

_List the SFCs of your application_

## Server interaction

_List the features in your application that are persisting and retrieving data from the server_

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

## Notes for instructor

### Vocabulary Quiz

##### The application is a guessing game of words based on the definitions provided. The application is integrated with third party APIs to pull defintions and the user is randomly assigned a word to play with from a list in firbase based on a category of choice.

- The running score is per category. The user can select one of the 12 categories to play. Words will be randomly picked and definitions/hints are fetched from an external API.

- There is a search functionality for categories. It will default to the homepage if the search criterion is not found

- A user can not submit answer again if he/she gets the correct answer or after 3 wrong attempts

- The definitions of the words is pulled from an external API called WordAPI. The words in play however are defined in firebase and there is a component for seeding firebase.

- The chart is drawn using chart js library.

- The user can navigate using the buttons or a NavBar. The Navbar alternates between showing stats and categories depending on where the user is.

- Some components communicate using params in the router link
