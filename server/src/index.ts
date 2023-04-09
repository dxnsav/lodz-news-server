import * as functions from "firebase-functions";
import app from "../../src/app";
import scrapper from "../../src/scrapper";

export const server = functions.https.onRequest(app);
export const scrapArticles = functions.https.onRequest(scrapper);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
