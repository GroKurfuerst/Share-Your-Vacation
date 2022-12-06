const express = require("express")
const catchAsync = require("../utils/catchAsync")
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware")
const campgroundsController = require("../controllers/campgrounds")   //the controller object

const { storage } = require("../cloudinary/index")
const multer = require("multer")
const upload = multer({ storage })

const router = express.Router()

router.route("/")
    .get(catchAsync(campgroundsController.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgroundsController.createCampground))

router.get("/new", isLoggedIn, campgroundsController.renderNewForm)

router.route("/:id")
    .get(catchAsync(campgroundsController.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground,
        catchAsync(campgroundsController.editCampground))
    .delete(isLoggedIn, isAuthor,
        catchAsync(campgroundsController.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgroundsController.renderEditForm))

module.exports = router