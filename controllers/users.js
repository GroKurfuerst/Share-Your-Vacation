const User = require("../models/user")

module.exports.renderRegisterForm = async (req, res) => {
    res.render("users/register")
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, e => {
            if (e) { return next(e) }
            req.flash("success", "Welcome to Yelp Camp!!!")
            res.redirect("/campgrounds")
        })

    }
    catch (e) {
        req.flash("error", e.message)
        res.redirect("/register")
    }

    //res.send(req.body)
}

module.exports.renderLoginForm = async (req, res) => {
    res.render("users/login")
}

module.exports.login = async (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`)
    //console.log(req.session)
    const redirectUrl = req.session.returnTo || "/campgrounds"
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        req.flash("success", "Goodbye!")
        res.redirect("/campgrounds")
    })
}