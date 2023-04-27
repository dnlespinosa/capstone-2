"use strict"

const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError')
const Workout = require('../models/program')

const router = new express.Router();

router.get('/', async function (req, res, next) {
    try {
        const workouts = await Workout.findAll();
        return res.json({ workouts })
    } catch (e) {
        return next(e)
    }
})

router.get('/:name', async function (req, res, next){
    try {
        const workout = await Workout.find(req.params.name)
        return res.json({ workout })
    } catch (e) {
        return next(e)
    }
})

router.get('/id/:id', async function (req, res, next){
    try {
        const workout = await Workout.getByid(req.params.id);
        return res.json({ workout })
    } catch (e) {
        return next(e)
    }
})

module.exports = router