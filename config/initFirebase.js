// Dependencies
const admin = require("firebase-admin");

// Function to decode firebase account key
const decodeFirebaseKey = () => {
  if (process.env.FIREBASE_ACCOUNT) {
    return JSON.parse(
      Buffer.from(process.env.FIREBASE_ACCOUNT, "base64").toString("ascii")
    );
  } else {
    return require(`${process.env["HOME"]}/secrets/firebaseAccountKey.json`);
  }
};

// Main
// Call decode of firebase account key
const serviceAccount = decodeFirebaseKey();

// Initialize Firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoverse-5090b.firebaseio.com",
});

// Create a namespace for firestore
const db = admin.firestore();

// Export namespace for firestore
module.exports = db;
