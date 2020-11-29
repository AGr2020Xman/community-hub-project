const { checkAuthenticated } = require('../../config/middleware/checkAuth');
const { typeOfQueryData } = require('./api-user-query');
const express = require('express');
const db = require('../../models');
const router = express.Router();

// find a user by full name, nick name, or 'partial' name, or UUID
router.post('/api/users', checkAuthenticated, async (req, res) => {
  if (!req.query || req.query === 0) {
    res.json({});
  } else {
    typeOfQueryData(req, res);
  }
});

router.put('/api/users', checkAuthenticated, async (req, res) => {
  console.log('USER BEFORE UPDATE', req.user.uniqueIdentifier);
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  try {
    db.User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      },
      {
        where: {
          uniqueIdentifier: req.user.uniqueIdentifier,
        },
      }
    ).then((dbUser) => {
      res.status(201).json(dbUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/api/users', checkAuthenticated, async (req, res) => {
  db.User.destroy({
    where: {},
  });
});

module.exports = router;
