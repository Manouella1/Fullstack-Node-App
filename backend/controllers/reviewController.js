const Review = require("../models/reviewModel");

// Alla reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// En specifik review
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Ny review
exports.createReview = async (req, res) => {
    const { reviewUsername, reviewTitle, reviewText, reviewStars, reviewDate } = req.body;
    try {
        const newReview = new Review({
            username: reviewUsername,
            title: reviewTitle,
            text: reviewText,
            stars: reviewStars,
            date: reviewDate
        });
        const savedReview = await newReview.save();
        return res.status(201).json(savedReview);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Uppdatera en review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { reviewTitle, reviewText, reviewStars, reviewDate } = req.body;
    try {
        await Review.updateOne({_id: id}, {
            title: reviewTitle,
            text: reviewText,
            stars: reviewStars,
            date: reviewDate
        });
        const updatedReview = await Review.findById(id);
        return res.status(200).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Radera en review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
