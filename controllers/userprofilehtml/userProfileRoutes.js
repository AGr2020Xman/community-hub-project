const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');
const express = require('express');

const router = express.Router();

router.get('/user-profile', checkAuthenticated, async (req, res) => {
  res.render('user-profile');
});

module.exports = router;
