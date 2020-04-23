The running score is per category. The user can select one of the 12 categories to play. Words
will be randomly picked and definitions/hints are fetched from an external API.

There is a search functionality for categories. It will default to the homepage if the
search criterion is not found

A user can not submit answer again if he/she gets the correct answer or after 3 wrong attempts

The definitions of the words is pulled from an external API called WordAPI. The words in play however are defined in firebase and there is a component for seeding firebase.

The chart is drawn using chart js library.

The user can navigate using the buttons or a NavBar. The Navbar alternates between showing stats and categories depending on where the user is.

Some components communicate using params in the router link

##Sources
