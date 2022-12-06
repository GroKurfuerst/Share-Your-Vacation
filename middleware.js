const Campground = require("./models/campground")
const Review = require("./models/review")
const { campgroundSchema, reviewSchema } = require("./schema")
const ExpressError = require("./utils/ExpressError")

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        //console.log(error.details)
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    //console.log(req.user)
    if (!req.isAuthenticated()) {
        //console.log(req.path, req.originalUrl)   //first one is the relative path and second one is the absolute path
        req.session.returnTo = req.originalUrl
        req.flash("error", "You must sign in first!")
        return res.redirect("/login")
    }
    next()
}

module.exports.isAuthor = async (req, res, next) => {
    const id = req.params.id
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!")
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!")
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
