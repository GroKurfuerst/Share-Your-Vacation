const express = require("express")
const catchAsync = require("../utils/catchAsync")
const passport = require("passport")
const usersController = require("../controllers/users")

const router = express.Router()

router.route("/register")
    .get(catchAsync(usersController.renderRegisterForm))
    .post(catchAsync(usersController.register))

router.route("/login")
    .get(catchAsync(usersController.renderLoginForm))
    .post(passport.authenticate("local",
        { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }),
        catchAsync(usersController.login))

router.get("/logout", usersController.logout)

module.exports = router