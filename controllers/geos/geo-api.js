const express = require("express");
const router = express.Router();
const db = require('../../models');

router.post("/api/geo", async (req, res) => {
    console.log(req.body);
    try {
        const geo = {name: req.body.name,}
        db.Geo.create(geo).then(() => {
        res.status(307);
        res.json(geo)
        // res.redirect("/geo");
      });
    } catch (err) {
      if (err) console.log("There was an error signing up user:\n");
      res.status(401).json(err);
    //   res.redirect("/");
    }
  });

  module.exports = router;