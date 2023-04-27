"use strict"

const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError')
const User = require('../models/user')
const { createToken } = require ('../helpers/token')
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json')

const router = express.Router();



router.get('/', async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users })
    } catch (e) {
        return next(e)
    }
})

router.get('/:username', async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (e) {
        return next(e)
    }
})

router.patch('/:username', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema)
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        const user = await User.update(req.params.username, req.body)
        return res.json({ user })
    } catch (e) {
        return next(e)
    }
})

router.delete('/:username', async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username })
    } catch (e) {
        return next(e)
    }
})

router.post('/:username/browse/:id', async function (req, res, next) {
    try {
        const workoutId = req.params.id;
        await User.selectWorkout(req.params.username, workoutId)
    } catch (e) {
        return next(e)
    }
})

router.get('/completed/:username', async function (req, res, next) {
    try {
        const user = await User.completeWorkout(req.params.username)
        return res.json({ user })
    } catch (e) {
        return next(e)
    }
})

router.patch('/completed/:username', async function (req, res, next) {
    try {
        const user = await User.updateWorkout(req.params.username)
        return res.json({ user })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;