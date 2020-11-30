// Setup Firebase
const db = require('../../config/initFirebase');

/* eslint-disable */
const { checkAuthenticated } = require('../../config/middleware/checkAuth');
/* eslint-enable */

// Create routes
module.exports = (app) => {
  // Get route for createMyPage
  app.get('/sites/:geo/:community/create', (req, res) => {
    res.render('createMyPage', req.params);
  });

  // Get route for myPage
  app.get('/sites/:geo/:community/:name', (req, res) => {
    const siteRef = db
      .collection('sites')
      .where('geo', '==', req.params.geo)
      .where('community', '==', req.params.community)
      .where('name', '==', req.params.name);

    siteRef.get().then((docs) => {
      docs.forEach((site) => {
        res.render('myPage', site.data());
      });
    });
  });

  // Get route for sites by geo and community
  app.get('/sites/:geo/:community', (req, res) => {
    const sitesRef = db
      .collection('sites')
      .where('geo', '==', req.params.geo)
      .where('community', '==', req.params.community);
    sitesRef.get().then((docs) => {
      const hbsObject = { sites: {}, geo: req.params.geo, community: req.params.community };
      docs.forEach((site) => {
        hbsObject.sites[site.id] = {
          ...site.data(),
        };
      });
      res.render('sites', hbsObject);
    });
  });

  // Get route for sites by geo
  app.get('/sites/:geo', (req, res) => {
    const sitesRef = db.collection('sites').where('geo', '==', req.params.geo);
    sitesRef.get().then((docs) => {
      const hbsObject = { sites: {} };
      docs.forEach((site) => {
        hbsObject.sites[site.id] = {
          ...site.data(),
        };
      });
      res.render('sites', hbsObject);
    });
  });

  // Get route for all sites
  app.get('/sites', async (req, res) => {
    const sitesRef = db.collection('sites');
    sitesRef.get().then((docs) => {
      const hbsObject = { sites: {} };
      docs.forEach((site) => {
        hbsObject.sites[site.id] = {
          ...site.data(),
        };
      });
      console.log(hbsObject);
      res.render('sites', hbsObject);
    });
  });

  // Get route for search
  app.get('/search-sites', async (req, res) => {
    const sitesRef = db.collection('sites');
    const sitesSnapShot = await sitesRef.orderBy('title').get();
    const hbsObject = { sites: {} };
    sitesRef.get().then((docs) => {
      for (const result of sitesSnapShot.docs) {
        if (result.data().title.toLowerCase().includes(req.query.term.toLowerCase())) {
          hbsObject.sites[result.id] = {
            ...result.data(),
          };
        }
      }
      res.render('search-sites', hbsObject);
    });
  });

  // API POST route for all sites
  app.post('/api/search-sites', async (req, res) => {
    const sitesRef = db.collection('sites');
    const sitesSnapShot = await sitesRef.orderBy('title').get();
    const results = [];
    for (const result of sitesSnapShot.docs) {
      if (result.data().title.toLowerCase().includes(req.body.term)) {
        results.push(result.data());
      }
    }

    res.json(results);
  });

  // Post route for site
  app.post('/api/sites/', async (req, res) => {
    const pageData = {
      geo: req.body.geo,
      community: req.body.community,
      name: req.body.name,
      title: req.body.title,
      html: req.body.html,
    };

    const responseData = await db.collection('sites').add(pageData);
    res.json(responseData);
  });
};
