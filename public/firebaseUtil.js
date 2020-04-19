require("dotenv").config();

export const firebaseUtil = {
    data: {
        config: {
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            authDomain: 'e28-flashcard.firebaseio.com',
            databaseURL: 'http://e28-flashcard.firebaseio.com',
            projectId: 'e28-flashcard'
        }
    }

}

export default firebaseUtil; 