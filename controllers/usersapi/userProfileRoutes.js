const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');
const express = require('express');
const router = express.Router();


router.get('/api/user_data', checkAuthenticated, (req, res) => {
    
})

module.exports = router;