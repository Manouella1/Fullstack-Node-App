const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.get('/api/reviews', reviewController.getAllReviews);  
router.post('/api/reviews', reviewController.createReview);  
router.put('/api/reviews/:id', reviewController.updateReview);  
router.delete('/api/reviews/:id', reviewController.deleteReview);  
router.get('/api/reviews/:id', reviewController.getReviewById);  

module.exports = router;
