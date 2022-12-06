const express = require("express")
const catchAsync = require("../utils/catchAsync")
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware")
const reviewsController = require("../controllers/reviews")

const router = express.Router({ mergeParams: true })

router.post("/", isLoggedIn, validateReview, catchAsync(reviewsController.createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteController))

module.exports = router