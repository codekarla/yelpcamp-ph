// import modules
const express = require('express');

// express router
const router = express.Router();

// import models
const Campground = require('../models/campground');

//import utilities
const ExpressError = require('../utils/ExpressError.js')
const catchAsync = require('../utils/catchAsync.js')
const { joiCamp } = require('../joiSchemas.js');

// Joi Validation
const validateCamp = (req, res, next) => {    
    const {error} = joiCamp.validate(req.body);    
    if (error)    {
        console.log('error:', req.body);
        const msg = error.details.map(err => err.message).join(', ');
        throw new ExpressError(400, msg);
    }
    else    {
        next();
    }
}

// Show All (campgrounds) route
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    // console.log(campgrounds);
    res.render('campgrounds/index', {campgrounds});
}));

// Create (campground) routes
router.get('/new', async (req, res) => {
    res.render('campgrounds/new');
});
router.post('/', validateCamp, catchAsync(async (req, res, next) => {
    try {      
        const camp = new Campground(req.body);
        console.log('New Camp:', camp);
        // res.send(req.body);
        await camp.save();
        res.redirect(`/campgrounds/${camp._id}`);
    }
    catch (e) {
        next(e);
    }
}));

// Show 1 (campground) route
router.get('/:id', catchAsync(async (req, res) => {
    // console.log(req.params);
    const camp = await Campground.findById(req.params.id).populate('reviews');
    console.log('Showing Up:', camp);
    res.render('campgrounds/show', {camp});
}));

// Update (campground) routes
router.get('/:id/edit', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render(`campgrounds/edit`, {camp})
}));
router.put('/:id', validateCamp, catchAsync(async (req, res) => {
    // res.send(req.body);
    // const camp = await Campground.findByIdAndUpdate(req.params.id, req.body, {new: true});
    // console.log('Updated Camp:', camp)
    await Campground.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/campgrounds/${req.params.id}`);
}));

// Delete (campground) route 
router.delete('/:id', catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}));


module.exports = router;