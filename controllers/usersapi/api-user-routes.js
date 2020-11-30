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
  const updatedDetail = await req.body;
  const oldDetail = await req.user;
  const userUpdate = {
    firstName: updatedDetail.firstName,
    lastName: updatedDetail.lastName,
    password: updatedDetail.password,
  };
  try {
    await db.User.update(userUpdate, {
      where: {
        uniqueIdentifier: await oldDetail.dataValues.uniqueIdentifier,
      },
      individualHooks: true,
    }).then((dbUser) => {
      res.status(201).json(dbUser);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log('Error related to Update', err);
  }
});

router.delete('/api/users', checkAuthenticated, async (req, res) => {
  const oldDetail = await req.user;
  db.User.destroy({
    where: {
      uniqueIdentifier: await oldDetail.dataValues.uniqueIdentifier,
    },
  })
    .then(() => {
      res.status(200);
      res.redirect('/');
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log('Error related to Delete User', err);
    });
});

module.exports = router;
