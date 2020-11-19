// Setup Firebase
const admin = require("firebase-admin");
const serviceAccount = require("/home/harish/secrets/firebaseAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoverse-5090b.firebaseio.com",
});
const db = admin.firestore();

// Create routes
module.exports = (app) => {
  // Get route for myPage
  app.get("/sites/:geo/:community/:name", (req, res) => {
    const siteRef = db
      .collection("sites")
      .where("geo", "==", req.params.geo)
      .where("community", "==", req.params.community)
      .where("name", "==", req.params.name);

    siteRef.get().then((docs) => {
      docs.forEach((site) => {
        res.render("myPage", site.data());
      });
    });
  });

  // Get route for all sites
  app.get("/sites", async (req, res) => {
    const sitesRef = db.collection("sites");
    sitesRef.get().then((docs) => {
      const hbsObject = { sites: {} };
      docs.forEach((site) => {
        hbsObject.sites[site.id] = {
          ...site.data(),
        };
      });
      res.render("sites", hbsObject);
    });
  });
};
