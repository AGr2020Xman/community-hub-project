// Setup Firebase
const admin = require("firebase-admin");
const serviceAccount = require("C:\\Users\\Andre\\secrets\\firebaseAccountKey.json");
const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoverse-5090b.firebaseio.com",
});
const db = admin.firestore();

// Create routes
module.exports = (app) => {
  // Get route for createMyPage
  app.get("/sites/:geo/:community/create", (req, res) => {
    res.render("createMyPage", req.params);
  });

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

  // Get route for sites by geo and community
  app.get("/sites/:geo/:community", (req, res) => {
    const sitesRef = db
      .collection("sites")
      .where("geo", "==", req.params.geo)
      .where("community", "==", req.params.community);
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

  // Get route for sites by geo
  app.get("/sites/:geo", (req, res) => {
    const sitesRef = db.collection("sites").where("geo", "==", req.params.geo);
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

  // Post route for site
  app.post("/api/sites/", checkAuthenticated, async (req, res) => {
    const pageData = {
      geo: req.body.geo,
      community: req.body.community,
      name: req.body.name,
      title: req.body.title,
      html: req.body.html,
    };

    const responseData = await db.collection("sites").add(pageData);
    res.json(responseData);
  });
};
