const express = require("express");
const router = express.Router();
const db = require('../../models');

router.post("/api/community", async (req, res) => {
    try {
      const community = {name: req.body.name,}
        db.Community.create(geo).then(() => {
        res.status(307);
        res.json(community)
        // res.redirect("/community");
      });
    } catch (err) {
      if (err) console.log(`There was an error adding the community:\n ${err}`);
      res.status(401).json(err);
    //   res.redirect("/");
    }
  });

  module.exports = router;