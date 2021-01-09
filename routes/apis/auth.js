const express = require(`express`)
const router = express.Router();
const User = require(`../../config/models/User`)
const auth = require("../../config/middleWare/auth")
const bcrypt = require("bcryptjs")
const jwt = require(`jsonwebtoken`)
const config = require(`config`)
const { check, validationResult } = require('express-validator');
//  Get Api Auth
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(`-password`);
        res.json(user);
    }
    catch (e) {
        res.status(500).send(`Server error `)
    }
})
router.post("/", [
    check("email", `Please enter valid email `).isEmail(),
    check("password", `Password is required`).exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        console.log(`req `, req.body);
        let user = await User.findOne({ email })
        console.log(`Password`, user.password);
        if (!user) {
            return res.status(400).json({ errors: [{ msg: `Invalid credentials` }] })
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: `Invalid credentials` }] })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        console.log(`payload`, payload);
        jwt.sign(payload, config.get(`jwtSecretKey`), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    }
    catch (e) {
        console.error(e.message)
        res.status(500).send(`Sever error`)
    }
})
module.exports = router;