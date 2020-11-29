// Dependencies
const admin = require('firebase-admin');
const os = require('os');

// Function to decode firebase account key
/* eslint-disable */
const decodeFirebaseKey = () => {
  if (process.env.FIREBASE_ACCOUNT) {
    return JSON.parse(Buffer.from(process.env.FIREBASE_ACCOUNT, 'base64').toString('ascii'));
  }
  if (os.type() === 'Windows_NT') {
    return require(`${os.homedir()}\\secrets\\firebaseAccountKey.json`);
  }
  return require(`${process.env['HOME']}/secrets/firebaseAccountKey.json`);
};
/* eslint-enable */

// Main
// Call decode of firebase account key
const serviceAccount = decodeFirebaseKey();

// Initialize Firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://geoverse-5090b.firebaseio.com',
});

// Create a namespace for firestore
const db = admin.firestore();

// Export namespace for firestore
module.exports = db;
