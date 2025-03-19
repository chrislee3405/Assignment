
const express = require('express');
const { getCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getCourses)

module.exports = router;

