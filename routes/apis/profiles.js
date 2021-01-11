const express = require(`express`);
const router = express.Router();
const auth = require("../../config/middleWare/auth");
const Profile = require("../../config/models/Profile");
const { check, validationResult } = require('express-validator');
// @route  GET api/profile/me
// @desc  Get user profile 
// @access Private 
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(`User`, [`name`, `avatar`]);
        if (!profile) {
            return res.status(400).json({ msg: `There is no profile for this user` })
        }
        res.json(profile)
    } catch (error) {
        res.status(500).send(`server error`)
    }
})
// @route  POST  api/profile
// @desc   create or update user profile
// @access Private 
router.post(`/`, [auth, [
    check(`status`, `status is required`).not().isEmpty(),
    check(`skills`, `skills is required`).not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { status, skills } = req.body;




})
module.exports = router;